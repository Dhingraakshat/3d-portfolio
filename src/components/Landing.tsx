import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              AKSHAT
              <br />
              <span>DHINGRA</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Data Analyst &</h3>
            <div className="landing-roles-cycle" aria-hidden="true">
              <span className="role-text">Data Analyst</span>
              <span className="role-text">HPC Developer</span>
              <span className="role-text">ML Engineer</span>
              <span className="role-text">Research Assistant</span>
            </div>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">HPC</div>
              <div className="landing-h2-2">Developer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">ML</div>
              <div className="landing-h2-info-1">Engineer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
