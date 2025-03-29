import React from 'react';

const FeatureCard = ({title, desc}) => {
  return (
    <div className='card'>
      <img src='/img2.png' width={400} height={200}/>
      <div className='content'>
        <h3 className='title'>{title}</h3>
        <p className='description'>
{desc}        </p>
      </div>
    </div>
  );
};


export default FeatureCard;
