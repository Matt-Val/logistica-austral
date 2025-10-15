import React from "react"
import CamionCard from "./CamionCard"
import camiones from '../../data/camiones.js'

const CamionLista = () => {
    return (
        <div className="row gy-4">
            {camiones.map(camion => (
                <div className="col-12" key={camion.id}>
                    <CamionCard camion={camion} />
                </div>
            ))}
        </div>
    )
}

export default CamionLista;