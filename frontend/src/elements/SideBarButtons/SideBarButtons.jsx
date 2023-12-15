import React from 'react';
import { NavLink } from 'react-router-dom';
import '../SideBarButtons/SideBarButtons.css';

const SideBarButton = ({ buttonText, route, svgPath }) => {
  return (
    <NavLink to={route} style={{ textDecoration: 'none' }} className="button-link" activeClassName="active">
      <button className="button">
        <svg className="bell" viewBox="0 0 448 512">
          <path d={svgPath}></path>
        </svg>
        <div className='button-name'>
          {buttonText}
        </div>
        <div className="arrow">›</div>
      </button>
    </NavLink>
  );
};

export default SideBarButton;
