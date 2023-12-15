import React from 'react';
import '../FormOutBox/FormOutBox.css';
import { BiGlobe } from 'react-icons/bi';
import LoginForm from '../Forms/Login';

function LoginFormOutBox() {
  return (
    <div className='needtocenter' >
    <div className="containers"  style={{boxShadow: "rgba(0, 0, 0, 0.3) 0px 4px 12px",marginTop:'20px',marginBottom:'20px'}}>
      <div className="login-link">
        <div className="logo">
          <BiGlobe />
          <span className="text">Navispere</span>
        </div>
        <center>
          <p className="side-big-heading">Create your account</p>
          <p className="primary-bg-text">To keep track on your dashboard please login with your personal info</p>
          <a className="loginbtn">Explore more</a>
        </center>
      </div>

      <div className="login-form-contents">
        <LoginForm />
      </div>
    
    </div>
    </div>
  );
}

export default LoginFormOutBox;
