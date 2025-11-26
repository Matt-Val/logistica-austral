import React from 'react'
import logo from '../../assets/logo-spread.png'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../../context/CarritoContext'

const Header = () => {

    const navegar = useNavigate()
    const { total } = useCarrito()
    // q, para el valor en si del estado, el que "busca"
    // setQ, lo utilizo para actualizar el estado, lo que escribe el usuario
    const [q, setQ] = React.useState('')

    const onSubmit = (e) => {
        e.preventDefault() // evita que el formulario recargue la pagina
        const busqueda = q.trim()
        if (busqueda) {
            navegar(`/explorar?q=${encodeURIComponent(busqueda)}`) // encodeURIComp: de javascript, convierte el texto a formato seguro de usar en html
        } else {
            // en caso de formulario vacio, navega al explorar, "ver todo"
            navegar('/explorar')
        }
    }

    return(
        <header className="encabezado">
            <div className="container">
                <div className="row d-lg-none mb-3">
                    <div className="col-12 d-flex justify-content-center">
                        <form className="d-flex busqueda-movil" role="search" onSubmit={onSubmit}>
                            <input
                                type="search"
                                className="form-control me-2"
                                placeholder="¿Qué equipo deseas arrendar?"
                                aria-label="Search"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary boton-buscar">Buscar</button>
                        </form>
                    </div>
                </div>

                {/* Desktop */}
                <div className="row align-items-center d-none d-lg-flex">
                    <div className="col-lg-3 d-flex justify-content-start mb-0">
                        <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '160px' }} />
                    </div>
                    <div className="col-lg-6 d-flex justify-content-center">
                        <form className="w-100 d-flex align-items-center justify-content-center" role="search" onSubmit={onSubmit}>
                            <input
                                type="search"
                                className="form-control"
                                placeholder="¿Qué equipo deseas arrendar?"
                                aria-label="Search"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                            <button type="submit" className="btn boton-buscar">Buscar</button>
                        </form>
                    </div>
                    <div className="col-lg-3 d-flex justify-content-end align-items-center">
                        <a href="#" className="icono-carrito" onClick={(e) => { e.preventDefault(); navegar('/cotizacion') }} aria-label="Carrito de cotización">
                            <span role="img" aria-hidden>🛒</span>
                            {total > 0 && <span className="badge">{total}</span>}
                        </a>
                    </div>
                </div>
            </div>
            <Navbar />
        </header>
    )
}
export default Header