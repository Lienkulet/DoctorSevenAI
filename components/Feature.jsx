import React from 'react'
import FeatureCard from './FeatureCard'

const Feature = () => {
    return (
        <section className='feature'>
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