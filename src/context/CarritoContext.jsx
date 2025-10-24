import React, { createContext, useContext, useMemo, useState } from 'react'

// contexto para manejar el carrito de cotización en toda la app
export const CarritoContext = createContext()

export function CarritoProvider({ children }) {
    
    // items tiene: [{ id, marca, nombre, imagen, fechas: { inicio, fin }, meses }]
    const [items, setItems] = useState(() => { 
        try { 
            const guardado = localStorage.getItem('carrito') // obtiene el carrito del localstorage
            return guardado ? JSON.parse(guardado) : []
        } catch {
            // si hay error, = vacio
            return []
        }
    })

    
    const [popup, setPopup] = useState({ abierto: false, id: null })

    const persistir = (proximo) => {
        // para actualizar el carrito en local storage
        setItems(proximo)
        try { localStorage.setItem('carrito', JSON.stringify(proximo)) } catch {}
    }

    // funcion meses
    const calcularMeses = (inicio, fin) => {
        if (!inicio || !fin) return 0
        const a = new Date(inicio)
        const b = new Date(fin)
        if (isNaN(a) || isNaN(b)) return 0
        const dias = Math.max(0, Math.ceil((b - a) / (1000 * 60 * 60 * 24)))
        // aproximacion simple: 30 dias = 1 mes
        return Math.max(1, Math.ceil(dias / 30))
    }

    const agregarItem = (camion) => {
        // si ya existe, no duplicar; solo abrir popup para editar fechas
        const existe = items.find((it) => it.id === camion.id)
        let nuevo = items

        if (!existe) {
            const hoy = new Date()
            const fin = new Date(hoy)
            fin.setMonth(fin.getMonth() + 1)
            const item = {
                id: camion.id,
                marca: camion.marca,
                nombre: camion.nombre,
                imagen: camion.imagen,
                fechas: {
                inicio: hoy.toISOString().slice(0, 10),
                fin: fin.toISOString().slice(0, 10),
                },
                meses: 1,
            }
            nuevo = [...items, item]
            persistir(nuevo)
        }
        setPopup({ abierto: true, id: camion.id })
    }

    const quitarItem = (id) => {
        const proximo = items.filter((it) => it.id !== id) // excluye el item con ese id
        persistir(proximo)
    }

    const actualizarFechas = (id, inicio, fin) => {
        const proximo = items.map((it) =>
        it.id === id ? {
                ...it,
                fechas: { inicio, fin },
                meses: calcularMeses(inicio, fin),
            } : it
        )
        persistir(proximo)
    }

    const abrirPopup = (id) => setPopup({ abierto: true, id })
    const cerrarPopup = () => setPopup({ abierto: false, id: null })

    const total = items.length

    const valor = useMemo( () => ({ // memoriza el valor del contexto para evitar render innecesaarios
        items,
        total,
        popup,
        agregarItem,
        quitarItem,
        actualizarFechas,
        abrirPopup,
        cerrarPopup,
        calcularMeses,
    }),
        [items, total, popup]
    )

    return  <CarritoContext.Provider value={valor}>
                {children}
            </CarritoContext.Provider>
}

export const useCarrito = () => useContext(CarritoContext)





