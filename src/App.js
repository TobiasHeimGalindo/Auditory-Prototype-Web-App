import React from 'react';
import './App.css';
import HeroSection from './components/HeroSection';


function App() {

  return (
    <div className="App">
      <header className="navbar">Navbar</header>
      <section className="hero-section"><HeroSection></HeroSection></section>
      <section className="about-us-section">About Us Section</section>
      <section className="featured-favorites-section">Featured Favorites Section</section>
      <section className="menu-section">Menu Section</section>
      <section className="location-section">Location Section</section>
      <footer className="footer">Footer</footer>
    </div>
  );
}

export default App;
