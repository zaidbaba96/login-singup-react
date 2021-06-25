import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom'

const Navbar = ()=>{
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">Zaid Baba</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
            <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" >AboutMe</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" >Contact Us</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to='/login'>Login</NavLink>
        </li>
        </ul>
    </div>
</nav>
        </>
    )
}


export default Navbar