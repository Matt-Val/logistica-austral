
import logisticaMapa from '../assets/img/chl-log-aus.png'
import marcas from '../assets/img/marcas.png'


import Carrusel from '../components/ui/Carrusel'

import '../css/inicio.css'
import '../css/login.css'

function Inicio() {
    return(
    <>
        <Carrusel />
        <div>
            <div className="bg-white">
                <div className="container col-sm-8 px-4 py-5">
                    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                        <div className="col-10 col-sm-8 col-lg-6">
                            <img src={logisticaMapa} className="d-block mx-lg-auto img-fluid" alt="" width="700" height="500" />
                        </div>
                        <div className="col-lg-6">
                            <h1>¿Por qué elegirnos?</h1>
                            <p>
                                En Logística Austral, contamos con profesionales altamente capacitados para realizar mantenciones
                                a nuestra flota. Nuestro soporte estará listo para apoyarte y dar con la solución para tu proyecto.
                                A lo largo de Chile, Logística Austral ha logrado completar más de 700.000KM con nuestra excelente flota.
                            </p>
                            <button type="button" className="btn btn-lg boton-per">
                                Encuéntranos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Inicio