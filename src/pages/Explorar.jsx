import React from 'react'

import CamionLista from '../components/ui/CamionLista';

import '../css/explorar.css'

function Explorar() {
    return (
        <div className="container">
            <h1 className="my-4">Explorar Flota</h1>
            <CamionLista />
        </div>
    );
}

export default Explorar