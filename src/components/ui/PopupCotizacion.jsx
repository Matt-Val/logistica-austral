import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../../context/CarritoContext'


const PopupCotizacion = () => {
    const navegar = useNavigate()
       const { popup, items, actualizarFechas, cerrarPopup } = useCarrito() // agarramos funciones, estados del contextCrrito

    if (!popup.abierto) return null // para cuando el popuup no esta abierto, que no renderice nada

       const item = items.find((i) => i.lineaId === popup.lineaId) // busca el item agregado usando el lineaId guardado en el popup
    
    if (!item) return null // no item, bum: null

    const onCambiar = (e) => {
        const { name, value } = e.target
        const inicio = name === 'inicio' ? value : item.fechas.inicio
        const fin = name === 'fin' ? value : item.fechas.fin
            actualizarFechas(item.lineaId, inicio, fin)
    }

    const irAlCarrito = () => { // con esto maneja el popup, asi dice: cierra y navega
        cerrarPopup()
        navegar('/cotizacion')
    }

    return (
        <div className="popup-capa" role="dialog" aria-modal="true">
            <div className="popup-contenido shadow">
                <div className="text-center mb-3">
                    <div className="popup-check mb-2">
                        ✓
                    </div>
                <h4>Máquina agregada al carrito</h4>
                </div>
                <div className="mb-3 small">
                    <strong>Producto:</strong> {item.marca} - {item.nombre}
                </div>
                <h4>Fecha de arriendo</h4>
                <div className="row g-3">
                    <div className="col-12 col-md-6">
                        <label className="form-label">Fecha inicio:</label>
                        <input
                            type="date"
                            className="form-control"
                            name="inicio"
                            value={item.fechas.inicio}
                            min={new Date().toISOString().slice(0,10)}
                            onChange={onCambiar}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label className="form-label">Fecha final:</label>
                        <input
                            type="date"
                            className="form-control"
                            name="fin"
                            value={item.fechas.fin}
                            min={item.fechas.inicio}
                            onChange={onCambiar}
                        />
                    </div>
                    <div className="col-12">
                        <div className="mt-1">Meses de arriendo: <strong>{item.meses}</strong></div>
                    </div>
                </div>

                <div className="d-flex gap-2 justify-content-center mt-4">
                    <button className="btn boton-formulario" onClick={irAlCarrito}>Ir al carrito</button>
                    <button className="btn btn-dark" onClick={cerrarPopup}>Seguir cotizando</button>
                </div>
            </div>
        </div>
    )
}

export default PopupCotizacion
