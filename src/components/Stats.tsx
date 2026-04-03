import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./styles/Stats.css";

const stats = [
  { value: 27, suffix: "+", label: "Technologies" },
  { value: 6, suffix: "", label: "Roles & Collaborations" },
  { value: 4, suffix: "", label: "Projects Built" },
  { value: 1, suffix: "×", label: "Hackathon Medal" },
];

const Stats = () => {
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    numRefs.current.forEach((el, i) => {
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stats[i].value,
        duration: 2,
        ease: "power2.out",
        snap: { val: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          if (el) el.textContent = String(Math.round(obj.val));
        },
      });
    });
  }, []);

  return (
    <div className="stats-section">
      {stats.map((stat, i) => (
        <div className="stat-item" key={i}>
          <div className="stat-number">
            <span ref={(el) => (numRefs.current[i] = el)}>0</span>
            {stat.suffix}
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
