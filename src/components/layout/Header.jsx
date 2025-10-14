import React from 'react'
import logo from '../../assets/logo-spread.png'
import Navbar from './Navbar'

const Header = () => {
    return(
        <header className="encabezado">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-3 d-flex justify-content-lg-start justify-content-center mb-3 mb-lg-0">
                        <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '160px' }} />
                    </div>
                    <div className="col-12 col-lg-6 d-flex justify-content-center">
                        <form className="w-100" role="search">
                            <input
                                type="search"
                                className="form-control"
                                placeholder="¿Qué equipo deseas arrendar?"
                                aria-label="Search"
                            />
                        </form>
                        <button type="button" className="btn boton-per">Buscar</button>
                    </div>
                    <div className="col-lg-3 d-none d-lg-block"></div>
                </div>
            </div>
            <Navbar />
        </header>
    )
}
export default Header