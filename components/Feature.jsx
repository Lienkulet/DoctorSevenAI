import React from 'react'
import FeatureCard from './FeatureCard'

const Feature = () => {
    return (
        <section className='feature'>
         <header className='feature-head'>
            <h1>Ai Features <br /> Tailored to You</h1>
            <p className='feature-sub'>Features that will make it easier for your to manage all your work</p>
         </header>
            <div className='feature-block'>
                <FeatureCard />
                <FeatureCard />
            </div>
            <div className='feature-block'>
                <FeatureCard />
                <FeatureCard />
            </div>
        </section>
    )
}

export default Feature