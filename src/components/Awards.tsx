import { FaMedal } from "react-icons/fa";
import "./styles/Awards.css";

const Awards = () => {
  return (
    <div className="awards-section section-container">
      <div className="awards-container">
        <h2>
          Honours <span>&</span>
          <br /> Awards
        </h2>
        <div className="awards-list">
          <div className="award-card">
            <div className="award-icon">
              <FaMedal />
            </div>
            <div className="award-content">
              <div className="award-header">
                <div>
                  <h3>LG AI Hackathon — 3rd Place (Bronze)</h3>
                  <h4>LG Corp · 28 January 2026</h4>
                </div>
                <span className="award-date">Jan 2026</span>
              </div>
              <p>
                Engineered a fully functional, product-ready Smart Home Hub using AI to
                optimize household energy consumption and reduce electricity waste. Developed
                real-time IoT data pipelines and deployed predictive ML models on edge hardware.
                Recognized by LG technical judges for architectural scalability, commercial
                viability, and successful AI deployment in an edge-computing environment.
              </p>
              <div className="award-tags">
                <span>IoT</span>
                <span>Machine Learning</span>
                <span>Edge Computing</span>
                <span>Real-time Pipelines</span>
                <span>Python</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awards;
