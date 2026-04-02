import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Software Eng. Trainee</h4>
                <h5>EPAM</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Selected from competitive applicant pool for intensive data engineering program. 
              Architecting high-throughput ETL/ELT pipelines, working with distributed processing 
              frameworks (Apache Spark/Hadoop), Kafka, and scalable SQL/NoSQL databases to manage 
              massive data volumes while applying rigorous software engineering best practices.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Applied AI & HPC Solutions Developer</h4>
                <h5>Tomega.lv · Riga, Latvia</h5>
              </div>
              <h3>12/02/26–NOW</h3>
            </div>
            <p>
              Architecting the High-Performance Computing backend for AI-driven EdTech solution. 
              Leveraging HPC clusters for large-scale model training and deploying distributed computing 
              pipelines to accelerate ML algorithm fine-tuning. Bridging heavy computational infrastructure 
              with seamless user experience for non-technical users.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Research Assistant</h4>
                <h5>Riga Technical University</h5>
              </div>
              <h3>25/11/25–NOW</h3>
            </div>
            <p>
              Co-conducting research on Model-Driven DevOps with AI (MDDOAI) with Prof. Jordi Cabot (University 
              of Luxembourg). Architecting scalable DevOps workflows, implementing M2M and M2T transformations to 
              automate GitLab CI/CD pipeline generation from software architecture models.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>HPC Solutions Developer</h4>
                <h5>SEB Bank (University–Industry Collaboration)</h5>
              </div>
              <h3>15/02–15/07/25</h3>
            </div>
            <p>
              Leveraged HPC infrastructure to architect large-scale data processing pipelines for advanced 
              financial analytics. Engineered computationally intensive predictive models (SVM, XGBoost) on HPC 
              clusters to forecast cash flow trends. Developed scalable ML classification system for client 
              segmentation and risk assessment.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Developer</h4>
                <h5>Formula Student RTU · Riga, Latvia</h5>
              </div>
              <h3>01/10/25–NOW</h3>
            </div>
            <p>
              Sole web developer building the official Formula Student RTU website from ground up. 
              Bridged technical engineering teams with external stakeholders. Managed digital communications 
              and sponsor engagement for international competition.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Graphic Designer</h4>
                <h5>Inventive Cafe India Pvt. Ltd.</h5>
              </div>
              <h3>15/01–15/06/21</h3>
            </div>
            <p>
              Initiated IT and digital career creating foundational brand assets (logos, web graphics) using 
              Adobe Creative Suite. Designed and delivered high-quality digital visual content across platforms 
              while aligning with corporate brand guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
