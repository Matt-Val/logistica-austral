import React, {useContext} from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useCarrito } from "../../context/CarritoContext"
import logo from "../../assets/logo-spread.png"


const Navbar = () => {
    // como funcion flecha, nos puede permitir agregar logica adicional, como hooks antes del return
    // y puedemos evitar redefiniciones accidentales, probemos
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const { total } = useCarrito();
    const navigate = useNavigate();

    const handleLogout = () => { 
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary py-2">
            <div className="container">
                {/* cambia a menu hamburguesa en movil */}
                <button className="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#laNavbar" aria-controls="laNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Logo a la derecha solo en móvil */}
                <Link to="/" className="navbar-brand d-lg-none ms-auto">
                    <img src={logo} alt="Logo" className="logo-navbar-movil img-fluid" />
                </Link>

                <div className="collapse navbar-collapse" id="laNavbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" aria-current="page">Inicio</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">Arriendo de Camiones</Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/explorar">Ver Todos</Link></li>
                                <li><Link className="dropdown-item" to="/explorar?tipo=tolva">Tolva</Link></li>
                                <li><Link className="dropdown-item" to="/explorar?tipo=tracto">Tracto</Link></li>
                                <li><Link className="dropdown-item" to="/explorar?tipo=rigido">Rigidos</Link></li>
                                <li><Link className="dropdown-item" to="/explorar?tipo=rampla">Camas bajas y ramplas</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="/quienes-somos" className="nav-link">Quiénes Somos</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item d-flex align-items-center me-lg-2">
                                    <span className="nav-link disabled">
                                        {user?.nombre || user?.correo || user?.email}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className="nav-link btn btn-link p-0"
                                        onClick={handleLogout}
                                    >Cerrar sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Iniciar Sesión</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/registro" className="nav-link">Registrarse</Link>
                                </li>
                            </>
                        )}

                        <li className="nav-item d-lg-none">
                            <a href="#" className="nav-link position-relative" onClick={(e) => { e.preventDefault(); navigate('/cotizacion') }} aria-label="Carrito de cotización">
                                <span role="img" aria-hidden>🛒</span>
                                {total > 0 && <span className="badge bg-primary position-absolute top-0 start-100 translate-middle p-1 rounded-pill">{total}</span>}
                            </a>
                        </li>


                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;