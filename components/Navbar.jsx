import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className="header">
            <div className="logo">
                <img src='logo2.png' height={66} width={66} />
                DoctorSeven</div>
            <ul className="nav">
                <Link href="#" className="nav-link">Overview</Link>
                <Link href="#" className="nav-link">Technology</Link>
                <Link href="#" className="nav-link">Testimonials</Link>
                <Link href="#" className="nav-link">Resources</Link>
            </ul>
            <div className="cta-buttons">
                <Link href="#" className="nav-link login">Login</Link>
                <Link href="/chat" className="nav-button">Get Started</Link>
            </div>
        </nav>
    )
}

export default Navbar