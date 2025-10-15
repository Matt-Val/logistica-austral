// para manejar las imagenes
import scania770 from '../assets/card/scania770-1.jpg'
import scaniap320 from '../assets/card/scania-p320.jpg'
import renault480 from '../assets/card/renault-t-480.jpg'
import volvo500 from '../assets/card/volvo-fh500.jpg'
import mercedes2545 from '../assets/card/actros-2545.jpg'
import mercedes3336 from '../assets/card/actros-3336-rampla.jpg'

import testside from '../assets/card/side330.jpg'

// aqui manejamos temporalmente los camiones disponibles para arriendo
const trucks = [
    {
        id: 1,
        marca: "Scania",
        nombre: "S V8 770S",
        motor: "770HP",
        descripcion: "Potencia ideal para cargas largas y pesadas. Con 4 ejes y 770HP, el Scania S V8 770S logra lo imposible.",
        imagen: scania770,
        lateral: testside,
        traccion: "8x4/4 midlift",
        longitudMax: "12.0 m",
        ejes: 4,
        peso: "23T"
    },
    {
        id: 2,
        marca: "Scania",
        nombre: "P320",
        motor: "320HP",
        descripcion: "Un Scania ideal para trabajos urbanos. Increible rendimiento, versátil y ágil.",
        imagen: scaniap320,
        lateral: testside,
        traccion: "4x2",
        longitudMax: "14.5 m",
        ejes: 2,
        peso: "12T"
    },
    {
        id: 3,
        marca: "Renault",
        nombre: "T-High 480",
        motor: "480HP",
        descripcion: "Los 480HP del T-high, lo hacen ideal para transportes de larga distancia gracias a su excelente rendimiento en carretera.",
        imagen: renault480,
        lateral: testside,
        traccion: "4x2",
        longitudMax: "12.2 m",
        ejes: 2,
        peso: "18T"
    },
    {
        id: 4,
        marca: "Volvo",
        nombre: "FH16 500",
        motor: "500HP",
        descripcion: "Alta potencia, con un gran rendimiento. Las caracteristicas de la versión Aero lo hacen una herramienta perfecta para cualquier trabajo, para cualquier distancia.",
        imagen: volvo500,
        lateral: testside,
        traccion: "4x2",
        longitudMax: "12.0 m",
        ejes: 2,
        peso: "20T"
    },
    {
        id: 5,
        marca: "Mercedes Benz",
        nombre: "Actros 2545",
        motor: "545HP",
        descripcion: "Tecnología, innovación y seguridad en cada viaje y operación tanto de larga distancia como urbana.",
        imagen: mercedes2545,
        lateral: testside,
        traccion: "6x2 taglift",
        longitudMax: "13.8 m",
        ejes: 3,
        peso: "19T"                               
    },
    {
        id: 6,
        marca: "Mercedes Benz",
        nombre: "Actros 3336 Rampla",
        motor: "336HP",
        descripcion: "El legado de Mercedes Benz, especial para transporte con rampla de gran capacidad.",
        imagen: mercedes3336,
        lateral: testside,
        traccion: "6x4",
        longitudMax: "10.5 m",
        ejes: 3,
        peso: "21T"                                   
    }
]

export default trucks;