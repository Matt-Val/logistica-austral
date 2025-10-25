import React from 'react'
import { useEffect, useMemo, useState } from 'react'
import CamionLista from '../components/ui/CamionLista';

import '../css/explorar.css'
import { useSearchParams } from 'react-router-dom';
import camiones from '../data/camiones.js'

// Apartado para mostrar camiones disponibles para explorar
// Clave usada por AdminCamiones para persistir disponibilidad en localStorage.
const STORAGE_KEY = "flota_disponibilidad";

function leerDisponibilidad(fleet) { 
    try { 
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") return {};
        const map = {};
        
        // Copia valores cuyo id exista en la flota actual.
        for (const c of fleet) { 
            if (Object.prototype.hasOwnProperty.call(parsed, c.id)) { 
                map[c.id] = !! parsed[c.id];
            }
        }
        return map;
    } catch { 
         // Si hay JSON inválido u otro error, considera todos disponibles.
        return {};
    }
}

function Explorar() {
    const [parametros] = useSearchParams() // arreglo para parametros url (?tipo, ?q)
    const tipo = (parametros.get('tipo') || '').toLowerCase()   // tipo de camion OR cadena vacia si null o undefined
    const q = (parametros.get('q') || '').toLowerCase().trim()  // busqueda "avanzada"

    // Fuerza a recarga de disponibilidad al cambiar storage (otra pestaña)
    const [tick, setTick] = useState(0); // estado para forzar recarga de disponibilidad
    useEffect( () => { 
        const onChange = () => setTick( (t) => t + 1);
        window.addEventListener("storage", onChange);
        window.addEventListener("focus", onChange);
        return () => { 
            window.removeEventListener("storage", onChange);
            window.removeEventListener("focus", onChange);
        };
    }, []);

    const disponibilidad = useMemo( () => leerDisponibilidad(camiones), [tick]);

    let items = camiones // inicializa lista de camiones disponibles

    if (tipo) {
        // para filtrar por tipo, esto por el navbar dropdown menu, si po no tiene valor, entonces, y deja solo aquellos con valor igual buscado
        items = items.filter(c => (c.tipo || '').toLowerCase() === tipo)
    }

    if (q) {
        // filtro de busqueda
        items = items.filter(c => {
            // entretenido, junta los campos relevantes del camion, (q quieres buscar) en un solo sttring y busca el termino
            const haystack = [
                c.marca, c.nombre, c.descripcion, c.traccion, c.motor, c.tipo
            ].filter(Boolean).join(' ').toLowerCase() // filter(Boolean) elimina ccampos que sean null, o vacios, join los junta por un espacio (' ')
            //vverifica si el string combinado incluye la busqueda (q)
            return haystack.includes(q)
        })
    }

    // Ocultar no disponibles 
    const visibles = items.filter( (c) => { 
        const val =
            disponibilidad[c.id] !== undefined
            ? disponibilidad[c.id]
            : c.disponible !== undefined
            ? !!c.disponible
            : true;
        return !!val;
    });

    return (
        <div className="container">
            <h1 className="my-4">Explorar Flota</h1>
            <CamionLista items={visibles}/>
        </div>
    );
}

export default Explorar