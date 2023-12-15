import React from 'react';
import Hero from './components/Hero/Hero';
import HomeCollection from './components/HomeCollection/HomeCollection';
import HomeSale from './components/HomeSale/HomeSale';
import HomeServices from './components/HomeServices/HomeServices';
import Testimonials from './components/Testimonials/Testimonials';

const Home = () => {
    return (
        <div className="home">
              <div style={{display:'flex',flexDirection:'column'}}>
            <Hero />
           <HomeServices />
            <HomeSale />
            <Testimonials />
            <HomeCollection />
            </div>
           
        </div>
    )
}

export default Home;