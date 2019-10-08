import React from 'react';
import logo from './../../assets/inworkers.jpeg';
import {Link} from 'react-router-dom';

function Logo() {
  return (
    <div className="logoContainer">
        <Link to="/"><img className="logo" src={logo} alt="Inworker" /></Link> 
    </div>
  );
}

export default Logo;

        