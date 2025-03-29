'use client';

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { CgArrowTopRight } from "react-icons/cg";

export default function Home() {
  return (
    <div className="landing-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <h2 className="headline">Take Control of Your <br /> Health with DoctorSeven</h2>
        <p className="hero-subtitle">
          DoctorSeven acts as your personal healthcare assistant, helping you track your wellness,
          manage your health goals, and make informed decisions—so you can live your healthiest life.
        </p>
        <Link href="/chat" className="hero-button">Try DoctorSeven Now<CgArrowTopRight size={24} /></Link>
        <p className="hero-info">Free for 14 Days</p>
      </section>
      <div className="hero-image"></div>

    </div>
  );
};




