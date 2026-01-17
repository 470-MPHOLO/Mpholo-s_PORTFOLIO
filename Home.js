import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="profile-section">
        <img 
          src="/profile.jpg" 
          alt="Teboho Mpholo" 
          className="profile-pic"
          onError={(e) => {
            e.target.src = 'https://ui-avatars.com/api/?name=Teboho+Mpholo&background=667eea&color=fff&size=200';
          }}
        />
        <h1>Teboho Mpholo</h1>
        <p className="tagline">Graphic Designer & Web Developer</p>
        <p className="location">📍 Lesotho</p>
        
        <div className="services">
          <h2>My Services</h2>
          <div className="service-cards">
            <div className="service-card">
              <h3>🎨 Graphics</h3>
              <p>Logos, Posters, CV Design</p>
            </div>
            <div className="service-card">
              <h3>🌐 Websites</h3>
              <p>Portfolio & Business Sites</p>
            </div>
            <div className="service-card">
              <h3>📱 UI/UX</h3>
              <p>Modern, Clean Designs</p>
            </div>
          </div>
        </div>
        
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>📧 Email: your-email@mpholo470@gmail.com</p>
          <p>📱 WhatsApp: +266 63608813</p>
          <button className="portfolio-btn" onClick={() => window.location.href='/portfolio'}>
            👇 View My Work
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
