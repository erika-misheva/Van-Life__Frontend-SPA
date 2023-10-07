import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import loginPhoto from '../assets/images/login-removebg-preview.png'

function fakeLogOut() {
    localStorage.removeItem("loggedin")
}

export default function Header() {
    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    return (
        <header>
            <NavLink className="site-logo" to="/"
                style={({ isActive }) => isActive ? activeStyle : null}>#VanLife</NavLink>
            <nav>
                <NavLink
                    to="/host"
                    style={({ isActive }) => isActive ? activeStyle : null}
                >Host</NavLink>

                <NavLink
                    to="/about"
                    style={({ isActive }) => isActive ? activeStyle : null}
                >About</NavLink>

                <NavLink
                    to="/vans"
                    style={({ isActive }) => isActive ? activeStyle : null}
                >Vans</NavLink>

                <Link to="login" className="login-link">
                    <img
                        src={loginPhoto}
                        className="login-icon"
                    />
                </Link>
                <button onClick={fakeLogOut}>X</button>
            </nav>
        </header>
    )
}

