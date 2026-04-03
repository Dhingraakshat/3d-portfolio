import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

// bg: sphere background colour, fg: fill injected into SVG paths (null = keep original)
const skillLogos = [
  { url: "/images/python.svg",      bg: "#ffffff", fg: null      },
  { url: "/images/sql.svg",         bg: "#ffffff", fg: null      },
  { url: "/images/cuda.svg",        bg: "#ffffff", fg: null      },
  { url: "/images/docker.svg",      bg: "#ffffff", fg: null      },
  { url: "/images/kubernetes.svg",  bg: "#ffffff", fg: null      },
  { url: "/images/git.svg",         bg: "#ffffff", fg: null      },
  { url: "/images/linux.svg",       bg: "#ffffff", fg: null      },
  { url: "/images/spark.svg",       bg: "#ffffff", fg: null      },
  { url: "/images/kafka.svg",       bg: "#ffffff", fg: "#231f20" },
  { url: "/images/react.svg",       bg: "#ffffff", fg: null      },
  { url: "/images/tensorflow.svg",  bg: "#ffffff", fg: null      },
  { url: "/images/numpy.svg",       bg: "#ffffff", fg: null      },
  { url: "/images/pandas.svg",      bg: "#ffffff", fg: null      },
  { url: "/images/jupyter.svg",     bg: "#ffffff", fg: null      },
  { url: "/images/scikitlearn.svg", bg: "#ffffff", fg: null      },
  { url: "/images/matplotlib.svg",  bg: "#ffffff", fg: null      },
  { url: "/images/aws.svg",         bg: "#ffffff", fg: null      },
  { url: "/images/azure.svg",       bg: "#ffffff", fg: null      },
  { url: "/images/mongodb.svg",     bg: "#ffffff", fg: null      },
  { url: "/images/github.svg",      bg: "#ffffff", fg: null      },
  { url: "/images/gitlab.svg",      bg: "#ffffff", fg: null      },
  { url: "/images/java.svg",        bg: "#ffffff", fg: null      },
  { url: "/images/javascript.svg",  bg: "#ffffff", fg: null      },
  { url: "/images/typescript.svg",  bg: "#ffffff", fg: null      },
  { url: "/images/nodejs.svg",      bg: "#ffffff", fg: null      },
  { url: "/images/html5.svg",       bg: "#ffffff", fg: null      },
  { url: "/images/css3.svg",        bg: "#ffffff", fg: null      },
];

// 2:1 canvas — logo drawn in each half so it shows on both front and back of the sphere
const TILE = 256;
const PAD = 36;

function createCanvasTexture(url: string, bg: string, fg: string | null): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = TILE * 2; // two tiles wide = logo at 0° and 180°
  canvas.height = TILE;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, TILE * 2, TILE);
  const texture = new THREE.CanvasTexture(canvas);

  fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${url}`);
      return r.text();
    })
    .then((svgText) => {
      let patched = svgText
        .replace(/\s*\bwidth\s*=\s*["'][^"']*["']/g, "")
        .replace(/\s*\bheight\s*=\s*["'][^"']*["']/g, "")
        .replace(/<svg/, `<svg width="${TILE}" height="${TILE}"`);

      if (fg) {
        patched = patched.replace(/<svg([^>]*)>/, `<svg$1><style>path,circle,rect,polygon{fill:${fg}}</style>`);
      }

      const dataUri =
        "data:image/svg+xml;charset=utf-8," + encodeURIComponent(patched);
      const img = new Image();
      img.onload = () => {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, TILE * 2, TILE);
        // Draw logo in left tile (front) and right tile (back)
        ctx.drawImage(img, PAD, PAD, TILE - PAD * 2, TILE - PAD * 2);
        ctx.drawImage(img, TILE + PAD, PAD, TILE - PAD * 2, TILE - PAD * 2);
        texture.needsUpdate = true;
      };
      img.onerror = () => console.warn(`Logo failed to render: ${url}`);
      img.src = dataUri;
    })
    .catch((e) => console.warn(e));

  return texture;
}

const textures = skillLogos.map(({ url, bg, fg }) => createCanvasTexture(url, bg, fg));

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = skillLogos.map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          metalness: 0.1,
          roughness: 0.6,
          clearcoat: 0.2,
        })
    );
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[i]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
