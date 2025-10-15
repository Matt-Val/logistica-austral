import { useParams } from 'react-router-dom'
import trucks from '../data/camiones'
import '../css/detalle-camion.css'

function DetalleCamion() {
    const { id } = useParams()
    const camion = trucks.find(c => String(c.id) === String(id))

    const {marca, nombre, motor, imagen, lateral, traccion, longitudMax, ejes, peso, descripcion} = camion

    return (
        <div className="container py-4 camion-detalle">
            <div className="row g-4 align-items-start">
                
                <div className="col-12 col-lg-6">
                    <div className="detalle-hero shadow-sm">
                        <img src={imagen} alt={`${marca} ${nombre}`} />
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <h2 className="mb-1">{marca} {nombre}</h2>
                    <div className="mb-3">Motor: {motor}</div>
                    {descripcion && <p className="mb-4">{descripcion}</p>}

                    <div className="d-flex gap-2 mb-3">
                        <button className="btn btn-primary">Agregar a Cotización</button>
                    </div>
                </div>
            </div>

        <img className="detalle-lateral my-4" src={lateral || imagen} alt={`Vista lateral ${marca} ${nombre}`}/>

        
        <div className="table-responsive">
            <table className="table align-middle table-striped">
                <thead>
                    <tr>
                    <th style={{width:'240px'}}>Especificación</th>
                    <th>Detalle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Tracción</td><td>{traccion}</td></tr>
                    <tr><td>Longitud máx.</td><td>{longitudMax}</td></tr>
                    <tr><td>Ejes</td><td>{ejes}</td></tr>
                    <tr><td>Peso</td><td>{peso}</td></tr>
                    {motor && <tr><td>Motor</td><td>{motor}</td></tr>}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default DetalleCamion