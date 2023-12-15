import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiGlobe } from 'react-icons/bi';
import $ from 'jquery';
import './Navbar.css';

function Header() {
  return (
    <header className="cd-header" style={{ display: 'flex', flexDirection: 'column',background:'white',transition:'0.6s'}}>
      <div className="header-wrapper">
        <div className="logo-wrap" style={{display:'flex'}}>
        <BiGlobe style={{fontSize:'20px'}} />
          <a style={{marginLeft:'3px'}} href="#" className="hover-target"><span>Navi</span>Sphere</a>
        </div>

        <div className="nav-but-wrap">
          <div className="menu-icon hover-target">
            <span className="menu-icon__line menu-icon__line-left"></span>
            <span className="menu-icon__line"></span>
            <span className="menu-icon__line menu-icon__line-right"></span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Navigation({ closeNavbar }) {
  const handleLinkClick = () => {
    if (closeNavbar) {
      closeNavbar();
    }
  };

  return (
    <div className="nav">
      <div className="nav__content">
        <ul className="nav__list">
          <li className="nav__list-item active-nav">
            <Link to="/" style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
              home
            </Link>
          </li>
          <li className="nav__list-item">
            <Link to={'/'} style={{textDecoration:'none'}}>
            <a href="#" className="hover-target">Dashboard</a>
            </Link>
          </li>
          <li className="nav__list-item">
          <Link to={'/'} style={{textDecoration:'none'}}>
            <a href="#" className="hover-target">service</a>
            </Link>
          </li>
          <li className="nav__list-item">
          <Link to={'/'} style={{textDecoration:'none'}}>
            <a href="#" className="hover-target">contact</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  useEffect(() => {
    function handleMouseMove(n) {
      $('#cursor').css({ left: n.clientX + 'px', top: n.clientY + 'px' });
      $('#cursor2').css({ left: n.clientX + 'px', top: n.clientY + 'px' });
      $('#cursor3').css({ left: n.clientX + 'px', top: n.clientY + 'px' });
    }

    function addHover() {
      $('#cursor2').addClass('hover');
      $('#cursor3').addClass('hover');
    }

    function removeHover() {
      $('#cursor2').removeClass('hover');
      $('#cursor3').removeClass('hover');
    }

    removeHover();

    const hoverTargets = document.querySelectorAll('.hover-target');

    hoverTargets.forEach((target) => {
      target.addEventListener('mouseover', addHover);
      target.addEventListener('mouseout', removeHover);
    });

    const body = document.querySelector('body');
    const menu = document.querySelector('.menu-icon');

    function applyListeners() {
      menu.addEventListener('click', () => {
        if (body.classList.contains('nav-active')) {
          body.classList.remove('nav-active');
        } else {
          body.classList.add('nav-active');
        }
      });
    }

    applyListeners();

    document.getElementsByTagName('body')[0].addEventListener('mousemove', handleMouseMove);

    return () => {
      document.getElementsByTagName('body')[0].removeEventListener('mousemove', handleMouseMove);
    };

  }, []);

  return (
    <>
      <Header toggleNavbar={toggleNavbar}/>
      <Navigation closeNavbar={closeNavbar} />
      <div className="section full-height over-hide">
        <div className="switch-wrap">
          {/* Add your content here */}
        </div>
      </div>
      <div className="cursor" id="cursor"></div>
      <div className="cursor2" id="cursor2"></div>
      <div className="cursor3" id="cursor3"></div>
    </>
  );
}

export default Navbar;
