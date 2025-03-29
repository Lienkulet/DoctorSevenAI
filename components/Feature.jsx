import React from 'react'
import FeatureCard from './FeatureCard'

const Feature = () => {
    return (
        <section id='feature' className='feature'>
            <header className='feature-head'>
                <h1>Ai Features <br /> Tailored to You</h1>
                <p className='feature-sub'>Features that will make it easier for your to manage all your work</p>
            </header>
            <div className='feature-block'>
                <FeatureCard title={'Medical Report Summarizer'} desc={'Summarize your medical report and use it to help in getting better health tips.'} />
                <FeatureCard title={'Medication Reminder'} desc={'Send personalized medication reminders and alert you to potential drug interactions, ensuring that your prescriptions work safely together.'} />
            </div>
            <div className='feature-block'>
                <FeatureCard title={'Symptom Checker'} desc={'Analyze your symptoms, medical history, and lifestyle factors to suggest possible diagnoses or conditions, helping you decide when to seek further medical attention.'} />
                <FeatureCard title={'Personalized Health Recommendations'} desc={'Based on your health data, provide personalized exercise routines, diet plans, and lifestyle changes to help improve your overall well-being.'} />
            </div>
        </section>
    )
}

export default Feature