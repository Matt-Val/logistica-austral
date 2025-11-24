import '../css/detalle-camion.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { camionService} from '../data/camionService.js';

function DetalleCamion() {
    const { id } = useParams()
    const { agregarItem } = useCarrito()

    // Estado para guardar el camion que se busca
    const [camion, setCamion] = useState(null);
    const [error, setError] = useState(false);

    useEffect( () => {
        const cargarCamion = async () => { 
            try { 
                // Se llama al backend pidiendo el camion por su ID.
                const data = await camionService.getCamion(id);
                setCamion(data);
            } catch (error) { 
                console.error("Error al obtener el camión:", error);
                setError(true);
            }
        };
        cargarCamion();
    }, [id]);

    // Mientra mensajes de carga mientras llega la info a AWS.
    if (error) return <div className="container py-5 text-center">Error al cargar el camión. Por favor intenta nuevamente.</div>
    if (!camion) return <div className="container py-5 text-center">Cargando detalles del camión...</div>
    

    const {marca, nombre, motor, imagen, lateral, traccion, longitudMax, ejes, peso, descripcion, tipo} = camion

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
                    <ul>
                        <li>Tipo Camión: {tipo}</li>
                    </ul>
                    {descripcion && <p className="mb-4">{descripcion}</p>}

                    <div className="d-flex gap-2 mb-3">
                        <button className="btn btn-primary" onClick={() => agregarItem(camion)}>Agregar a Cotización</button>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-4">
                <h2>Especificaciones</h2>
            </div>
        <img className="detalle-lateral" src={lateral || imagen} alt={`Vista lateral ${marca} ${nombre}`}/>
        <div className="d-flex justify-content-center">
                <p>Longitud máxima {longitudMax} mt</p>
            </div>


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
                    <tr><td>Longitud máx.</td><td>{longitudMax} mt</td></tr>
                    <tr><td>Ejes</td><td>{ejes}</td></tr>
                    <tr><td>Peso</td><td>{peso} T</td></tr>
                    {motor && <tr><td>Motor</td><td>{motor}</td></tr>}
                    <tr><td>Tipo Camión</td><td>{tipo}</td></tr>
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default DetalleCamion