import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  const handleResumeDownload = (e: React.MouseEvent) => {
    console.log('Resume download clicked from SocialIcons');
    e.preventDefault();
    try {
      const link = document.createElement('a');
      link.href = '/Akshat_CV_HPC_final.pdf';
      link.download = 'Akshat_Dhingra_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('Resume download initiated');
    } catch (error) {
      console.error('Resume download failed:', error);
    }
  };

  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/Dhingraakshat"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/akshat-dhingra-3b1476202/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </span>
      </div>
      <div
        className="resume-button"
        onClick={handleResumeDownload}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleResumeDownload(e as any);
          }
        }}
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </div>
    </div>
  );
};

export default SocialIcons;
