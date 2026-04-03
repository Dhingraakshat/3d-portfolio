import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="mailto:akshatdhingra365@gmail.com"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                Email — akshatdhingra365@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>
              BSc Computer Systems, Riga Technical University — 2022–2026
            </p>
            <p>
              HPC Programme, Riga Technical University — 2025
            </p>
          </div>
          <div className="contact-box">
            <h4>Languages</h4>
            <p>Hindi — Native</p>
            <p>English — Fluent</p>
            <p>German — Conversational</p>
            <h4>Social</h4>
            <a
              href="https://www.linkedin.com/in/akshat-dhingra-3b1476202/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="https://github.com/Dhingraakshat"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="mailto:akshatdhingra365@gmail.com"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Akshat Dhingra</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
