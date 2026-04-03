import { useEffect, useRef } from "react";
import "./styles/Spotlight.css";

const Spotlight = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--sx", `${e.clientX}px`);
      el.style.setProperty("--sy", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div className="spotlight-overlay" ref={ref} />;
};

export default Spotlight;
