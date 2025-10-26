import React, {useContext} from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"


const Navbar = () => {
    // como funcion flecha, nos puede permitir agregar logica adicional, como hooks antes del return
    // y puedemos evitar redefiniciones accidentales, probemos
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => { 
        logout();
        navigate("/");
    };

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
                            <li><Link className="dropdown-item" to="/explorar?tipo=tolva">Tolva</Link></li>
                            <li><Link className="dropdown-item" to="/explorar?tipo=tracto">Tracto</Link></li>
                            <li><Link className="dropdown-item" to="/explorar?tipo=rigido">Rigidos</Link></li>
                            <li><Link className="dropdown-item" to="/explorar?tipo=rampla">Camas bajas y ramplas</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <Link to="/quienes-somos" className="nav-link link-body-emphasis px-8">Quiénes Somos</Link>
                    </li>
                </ul>
                
                <ul className="nav align-items-center">
                    {isAuthenticated ? (
                    <>
                        <li className="nav-item d-flex align-items-center me-2">
                            <span className="nav-link disabled px-8">
                                {user?.nombre || user?.correo || user?.email}
                            </span>
                        </li>
                        
                        <li className="nav-item">
                            <button
                                type="button"
                                className="nav-link link-body-emphasis px-8 btn btn-link p-0"
                                onClick={handleLogout}
                            >Cerrar sesión
                            </button>
                        </li>
                    </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link link-body-emphasis px-8">Iniciar Sesión</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/registro" className="nav-link link-body-emphasis px-8">Registrarse</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;