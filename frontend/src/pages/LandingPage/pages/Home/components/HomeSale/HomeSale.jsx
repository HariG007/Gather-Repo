import React from 'react';
import "./homeSale.scss";
import { useNavigate } from 'react-router-dom';

const HomeSale = () => {
    const navigate = useNavigate();
    return (
        <div className="home-sale page-container">
            <div className="sale-content">
                <div className="sale-title d-flex flex-column">
                    <h2 data-aos="fade-right">Visualise?</h2>
                    <button data-aos="fade-right" onClick={() => navigate("")} className='general-button'>Let's go</button>
                </div>
            </div>
        </div>
    )
}

export default HomeSale;