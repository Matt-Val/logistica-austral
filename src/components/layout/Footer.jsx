import React from 'react'

import { Link } from "react-router-dom"
import marcas from '../../assets/img/marcas.png'
import logo from '../../assets/logo-spread-black.png'

// me queda pendiente: Dirigir estilos directamente con css
const Footer = () => {
    return(
        <footer>
        <div className="footer-box">
            <div className="d-flex justify-content-center border-top">
                <img src={marcas} className="img-fluid marcas-img" alt="Marcas" />
            </div>
            <div className="d-flex flex-wrap justify-content-between align-items-center py-3 footer-links-row">
                <p className="col-md-4 mb-0">
                    &copy; 2025 Logística Austral
                </p>
                <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto" aria-label="Bootstrap">
                    <img src={logo} alt="" className="img-fluid" style={{ maxWidth: '160px' }} />
                </a>
                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item">
                       <Link to="/quienes-somos" className="nav-link link-body-emphasis px-8">Quiénes Somos</Link>
                    </li>
                </ul>
            </div>
        </div>
        </footer>
    )
}

export default Footer