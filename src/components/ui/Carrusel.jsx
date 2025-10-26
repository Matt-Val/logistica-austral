import React from 'react'
import camionInicio from '../../assets/img/scania-fr.png'
import fondoInicio from '../../assets/img/bg-1-bl.jpg'
import { Link } from "react-router-dom"

// este es el carrusel de bienvenida, contiene el llamado a la accion
const Carrusel = () => {
    return(
        <div className="inicio-principal d-flex" style={{backgroundImage: `url(${fondoInicio})`}}>
            <div className="container-fluid">
                <div className="row g-4">
                    <div className="col-12 col-md-6 order-1 order-md-2 d-flex justify-content-center">
                        <div id="myCarousel" className="carousel slide w-100 d-flex justify-content-center" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="container">
                                        <div className="carousel-caption text-start">
                                            <h1>CAMIONES ÚNICOS</h1>
                                            <h1>PARA TUS NECESIDADES</h1>
                                            <p>Una flota moderna y confiable. Los mejores camiones para trabajos livianos y complejos.</p>
                                            <Link to="/explorar" className="btn btn-lg boton-per">Ver Camiones</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="container">
                                        <div className="carousel-caption">
                                            <h1>CALIDAD</h1>
                                            <h1>EN TODO MOMENTO</h1>
                                            <p>Logística Austral cuenta con trabajadores certificados dedicados al cuidado total de nuestra flota. Garantizando seguridad y excelencia.</p>
                                            <Link to="/explorar" className="btn btn-lg boton-per">Ver Camiones</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="container">
                                        <div className="carousel-caption text-end">
                                            <h1>SOPORTE</h1>
                                            <h1>PERSONALIZADO</h1>
                                            <p>Logística Austral te acompaña para dar soluciones rápidas para lo que necesites.</p>
                                            <Link to="/cotizacion" className="btn btn-lg boton-per">Cotizar</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon"></span>
                                <span className="visually-hidden">Anterior</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon"></span>
                                <span className="visually-hidden">Siguiente</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 order-2 order-md-1 d-flex justify-content-center align-items-end position-relative">
                        <img src={camionInicio} style={{ maxHeight: '700px' }} alt="" className="img-fluid imagen-principal" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carrusel