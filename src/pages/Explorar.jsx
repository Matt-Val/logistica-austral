import React from 'react'

import CamionLista from '../components/ui/CamionLista';

import '../css/explorar.css'
import { useSearchParams } from 'react-router-dom';
import camiones from '../data/camiones.js'

function Explorar() {
    const [parametros] = useSearchParams() // arreglo para parametros url (?tipo, ?q)
    const tipo = (parametros.get('tipo') || '').toLowerCase()   // tipo de camion OR cadena vacia si null o undefined
    const q = (parametros.get('q') || '').toLowerCase().trim()  // busqueda "avanzada"

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

    return (
        <div className="container">
            <h1 className="my-4">Explorar Flota</h1>
            <CamionLista items={items}/>
        </div>
    );
}

export default Explorar