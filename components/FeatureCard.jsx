import React from 'react';
import { FaFileAlt } from 'react-icons/fa'; 

const FeatureCard = () => {
  return (
    <div className='card'>
      <img src='/img2.png' width={400} height={200}/>
      <div className='content'>
        <h3 className='title'>Medical Report Summarizer</h3>
        <p className='description'>
          Summarize your medical report and use it to help in getting better health tips.
        </p>
      </div>
    </div>
  );
};


export default FeatureCard;
