import React from 'react'

import marcas from '../../assets/img/marcas.png'
import logo from '../../assets/logo-spread-black.png'

// me queda pendiente: Dirigir estilos directamente con css
const Footer = () => {
    return(
        <footer>
            <div className="d-flex justify-content-center border-top">
                <img src={marcas} className="img-fluid" alt="" style={{ maxWidth: '500px' }}/>
            </div>
            <div className="d-flex flex-wrap justify-content-between align-items-center py-3">
                <p className="col-md-4 mb-0">
                    &copy; 2025 Logística Austral
                </p>
                <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto" aria-label="Bootstrap">
                    <img src={logo} alt="" className="img-fluid" style={{ maxWidth: '160px' }} />
                </a>
                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item">
                        <a href="/" className="nav-link link-body-emphasis px-8e">Contáctanos</a>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-link link-body-emphasis px-8">FAQs</a>
                    </li>
                    <li className="nav-item">
                        <a href="/QuienesSomos" className="nav-link link-body-emphasis px-8 ">Quiénes Somos</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer