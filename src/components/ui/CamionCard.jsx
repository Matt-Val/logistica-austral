import React from "react"
import { Link } from "react-router-dom" 

// ojo con el boton ver detalles, mas adelante se implementa como otro componente generico?
const CamionCard = ({ camion }) => {
    return(
        <div className="card camion-card shadow-sm">
            <div className="row g-0 align-items-center">
                <div className="col-12 col-md-4 p-3 text-center camion-media">
                    <img src={camion.imagen} alt={`${camion.marca} ${camion.nombre}`} className="img-fluid" />
                </div>

                <div className="col-12 col-md-5 p-3">
                    <h5>{camion.marca} {camion.nombre}</h5>
                    <p className="mb-2 small text-body-secondary">Motor: {camion.motor}</p>
                    <ul className="camion-espec mb-0">
                        <li><span>Tracción:</span> {camion.traccion}</li>
                        <li><span>Longitud máx:</span> {camion.longitudMax}</li>
                        <li><span>Ejes:</span> {camion.ejes}</li>
                        <li><span>Peso:</span> {camion.peso}</li>
                    </ul>
                </div>

                <div className="col-12 col-md-3 p-3 d-flex flex-column gap-2 justify-content-end align-items-stretch align-items-md-end camion-botones">
                    <Link to={`/detalle/${camion.id}`} className="btn boton-detalles">Ver Detalles</Link>
                    <button type="button" className="btn boton-cotizar">Agregar a Cotización</button>
                </div>
            </div>
        </div> 
    )
}

export default CamionCard