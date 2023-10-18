import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import loginPhoto from '../assets/images/login-removebg-preview.png';
import { userSignOut } from '../utils';
import '../styles/header.css';

export default function Header() {
    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    };

    // const [loggedin, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('loggedin')));

    // useEffect(() => {
    //     console.log('I am called in the use effect and my value is ' + localStorage.getItem('loggedin'));
    //     setIsLoggedIn(JSON.parse(localStorage.getItem('loggedin')));
    // }, [localStorage.getItem('loggedin')]);

    // useEffect(() => {
    //     function checkLoggedIn() {
    //       const item = localStorage.getItem('loggedin')
      
    //       if (item) {
    //         setIsLoggedIn(item);
    //       }
    //     }
      
    //     window.addEventListener('storage', checkLoggedIn)
      
    //     return () => {
    //       window.removeEventListener('storage', checkLoggedIn)
    //     }
    //   })

    // console.log('loggedin: '  + loggedin)

    return (

        <header>
            <NavLink className="site-logo" to="/" style={activeStyle}>
                #VanLife
            </NavLink>
            <nav>
                <NavLink to="/host" style={activeStyle}>
                    Host
                </NavLink>

                <NavLink to="/about" style={activeStyle}>
                    About
                </NavLink>

                <NavLink to="/vans" style={activeStyle}>
                    Vans
                </NavLink>
                {/* {loggedin ? (
                    <button onClick={userSignOut}>
                        <img src="../assets/images/logout.png" className="logout-icon" alt="Logout" />
                    </button>
                ) : (
                    <Link to="login" className="login-link">
                        <img src={loginPhoto} className="login-icon" alt="Login" />
                    </Link>
                )} */}

                    <Link to="login" className="login-link">
                        <img src={loginPhoto} className="login-icon" alt="Login" />
                    </Link>
                    <button onClick={userSignOut}>
                        <img src="../assets/images/logout.png" className="logout-icon" alt="Logout" />
                    </button>
            </nav>
        </header>
    );
}
