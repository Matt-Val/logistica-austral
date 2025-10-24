import React, { createContext, useContext, useMemo, useState } from 'react'

// contexto para manejar el carrito de cotización en toda la app
export const CarritoContext = createContext()

export function CarritoProvider({ children }) {
    
    // items tiene: [{ lineaId, id, marca, nombre, imagen, fechas: { inicio, fin }, meses }]
    const [items, setItems] = useState(() => { 
        try { 
            const guardado = localStorage.getItem('carrito') // obtiene el carrito del localstorage
            return guardado ? JSON.parse(guardado) : []
        } catch {
            // si hay error, = vacio
            return []
        }
    })

    
    const [popup, setPopup] = useState({ abierto: false, lineaId: null })

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
        // Siempre agrega una nueva linea (posibles duplicados del mismo equipo con fechas distintas)
        const hoy = new Date()
        const fin = new Date(hoy)
        fin.setMonth(fin.getMonth() + 1)
        const item = {
            lineaId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
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
        const nuevo = [...items, item]
        persistir(nuevo)
        setPopup({ abierto: true, lineaId: item.lineaId })
    }

    const quitarItem = (lineaId) => {
        // Compatibilidad: si vienen items antiguos sin lineaId, tambien intentamos por id
        const proximo = items.filter((it) => it.lineaId !== lineaId && it.id !== lineaId)
        persistir(proximo)
    }

    const actualizarFechas = (lineaId, inicio, fin) => {
        const proximo = items.map((it) =>
        (it.lineaId === lineaId || it.id === lineaId) ? {
                ...it,
                fechas: { inicio, fin },
                meses: calcularMeses(inicio, fin),
            } : it
        )
        persistir(proximo)
    }

    const abrirPopup = (lineaId) => setPopup({ abierto: true, lineaId })
    const cerrarPopup = () => setPopup({ abierto: false, lineaId: null })

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





