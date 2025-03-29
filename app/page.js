'use client';

import Feature from "@/components/Feature";
import FeatureCard from "@/components/FeatureCard";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Prefooter from "@/components/Prefooter";


export default function Home() {
  return (
    <div className="landing-page">
      <Navbar />
    <div className="body-container">
   {/* Hero Section */}
   <Hero />

<div className="hero-image">
  <img src='/heroimg.png' className="imghero" />
</div>
<Feature />
<Prefooter />
    </div>
   
    </div>
  );
};




