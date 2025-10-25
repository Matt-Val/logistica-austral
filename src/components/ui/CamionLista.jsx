import React from "react"
import CamionCard from "./CamionCard"
import camiones from '../../data/camiones.js'

const CamionLista = ({ items }) => {
    // arreglo para comprobar que llegan camiones por filtro (items), si no, que muestre la lista completa de camiones (no hay filtro)
    const listaCamiones = Array.isArray(items) ? items : camiones

    if (!listaCamiones.length) {
        // si no existen items, comprueba por longitud
        return (
            <p className="text-body-secondary">No se encontraron camiones.</p>
        )
    }

    return (
        <div className="row gy-4">
            {listaCamiones.map(camion => (
                <div className="col-12" key={camion.id}>
                    <CamionCard camion={camion} />
                </div>
            ))}
        </div>
    )
}

export default CamionLista;