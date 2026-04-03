import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const handleResumeDownload = (e: React.MouseEvent) => {
    console.log('Resume download clicked from Landing');
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
            <a
              onClick={handleResumeDownload}
              className="resume-btn"
              data-cursor="disable"
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleResumeDownload(e);
                }
              }}
            >
              Download Resume ↓
            </a>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
