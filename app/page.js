'use client';

import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Prefooter from "@/components/Prefooter";


export default function Home() {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="body-container">
        <Hero />

        <div className="imagee">
          <div className="hero-image">
            <img src='/heroimg.png' className="imghero" />
          </div>
        </div>


        <Feature />
        <Prefooter />

      </div>
      <Footer />
    </div>
  );
};




