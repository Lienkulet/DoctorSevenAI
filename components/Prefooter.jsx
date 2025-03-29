import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa'; // Import the right arrow icon

const Prefooter = () => {
  return (
    <div id='prefooterCard' className="prefooterCard">
      <div className="prefooterCard-text">
        <h1 className="title">Ready to Streamline Your Workflow</h1>
        <p className="description">
          DoctorSeven acts as your personal healthcare assistant, helping you track your wellness, manage your health goals, and make informed decisions—so you can live your healthiest life.
        </p>
        <Link href={'/chat'} className="cta-btn">
          Try DoctorSeven Today <FaArrowRight size={14} />
        </Link>
        <p className="footer-text">No Credit Card Required!</p>
      </div>
      <div className="prefooterCard-image">
        {/* This area can be used for an image or graphic */}
      </div>
    </div>
  );
};

export default Prefooter;
