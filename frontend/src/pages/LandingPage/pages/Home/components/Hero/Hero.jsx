import React from 'react';
import "./hero.scss";
import { useNavigate } from 'react-router-dom';
const Hero = () => {
    const navigate = useNavigate()
    return (
        <div data-aos="zoom-in" className="hero page-container mb-4">
            <div className="hero-content">
                <h1 data-aos="fade-up"></h1>
                <h3 style={{paddingTop:'100px'}}  data-aos="fade-up">Server, Caster & Client</h3>
                <button data-aos="fade-up" onClick={() => navigate("/login")} className='general-button mt-4'>Sign In</button>
                <button style={{marginLeft:'10px'}} data-aos="fade-up" onClick={() => navigate("/register")} className='general-button mt-4'>New User</button>

            </div>
        </div>
    )
}

export default Hero;