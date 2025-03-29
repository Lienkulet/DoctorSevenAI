import React from 'react';
import { FaArrowRight } from 'react-icons/fa'; // Import the right arrow icon

const Prefooter = () => {
  return (
    <div className="prefooterCard">
      <div className="prefooterCard-text">
        <h1 className="title">Ready to Streamline Your Workflow</h1>
        <p className="description">
          Work smarter, not harder. DoctorSeven adjusts to your pace with AI-powered tools, so you can focus on what truly matters.
        </p>
        <button className="cta-btn">
          Try DoctorSeven Today <FaArrowRight size={14} />
        </button>
        <p className="footer-text">No Credit prefooterCard Required!</p>
      </div>
      <div className="prefooterCard-image">
        {/* This area can be used for an image or graphic */}
      </div>
    </div>
  );
};

export default Prefooter;
