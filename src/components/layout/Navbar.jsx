import { Link } from "react-router-dom"



const Navbar = () => {
    // como funcion flecha, nos puede permitir agregar logica adicional, como hooks antes del return
    // y puedemos evitar redefiniciones accidentales, probemos
    return (
        <nav className="py-2 bg-body-tertiary">
            <div className="container d-flex flex-wrap">
                <ul className="nav me-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link link-body-emphasis px-8" aria-current="page">Inicio</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle link-body-emphasis px-8" to="#" data-bs-toggle="dropdown" aria-expanded="false">Arriendo de Camiones</Link>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/explorar">Ver Todos</Link></li>
                            <li><Link className="dropdown-item" to="#">Tolva</Link></li>
                            <li><Link className="dropdown-item" to="#">Tracto</Link></li>
                            <li><Link className="dropdown-item" to="#">Camas bajas y ramplas</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <Link to="#" className="nav-link link-body-emphasis px-8">Contáctanos</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="#" className="nav-link link-body-emphasis px-8">Quiénes Somos</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="#" className="nav-link link-body-emphasis px-8">Descargar Catálogo</Link>
                    </li>
                </ul>
                
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link link-body-emphasis px-8">Iniciar Sesión</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/registro" className="nav-link link-body-emphasis px-8">Registrarse</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )

}

export default Navbar