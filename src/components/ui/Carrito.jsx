import React from 'react'
import { useCarrito } from '../../context/CarritoContext'

const Carrito = ({ items: propItems, quitarItem: propQuitarItem }) => {
    const carrito = useCarrito() 
        const items = propItems ?? (carrito && carrito.items) ?? [] // usa los items pasados por props, si no existen toma los del contexto, si tampoco existen usa un arreglo vacio
        const quitar = propQuitarItem ?? (carrito && carrito.quitarItem) ?? (() => {}) // usa la funcion quitarItem pasada por props, si no existe toma la del contexto, si tampoco existe usa una funcion vacia
    
    return (
        <div className="col-12 col-lg-5">
            <h4 className="mb-3 text-center">Mis Equipos</h4>
            {items.length === 0 && (
                <p className="text-body-secondary text-center">Aún no tienes equipos en tu carrito.</p>
            )}
            <div className="d-flex flex-column gap-3">
                {items.map((it) => (
                <div key={it.lineaId ?? it.id} className="shadow-sm p-3 rounded border bg-white">
                    <div className="d-flex align-items-center gap-3">
                    <img src={it.imagen} alt="camion" style={{ width: 72, height: 48, objectFit: 'cover' }} />
                    <div className="flex-grow-1">
                        <div className="fw-semibold">
                        {it.marca} - {it.nombre}
                        </div>
                        <div className="small text-body-secondary">
                        {it.meses} meses
                        </div>
                        <div className="small">Inicio: {it.fechas?.inicio} - Fin: {it.fechas?.fin}</div>
                    </div>
                    <button className="btn btn-link text-danger" title="Quitar" onClick={() => quitar(it.lineaId ?? it.id)}>🗑️</button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Carrito