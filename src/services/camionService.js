import axios from "axios";

const BASE_URL = "http://3.208.33.39:8080/api/camiones"; // IP Elastica

/*
    Funcion auxiliar para traducir de backend al front.
    Problema: Conflicto de nombres entre el backend y frontend
    De backend a front:
*/
const traduccionCamion = (cam) => { 
    return { 
        id: cam.idCamion,
        marca: cam.marcaCamion,
        nombre: cam.nombreCamion,
        motor: cam.motorCamion,
        descripcion: cam.descripcionCamion,
        imagen: cam.imagenCamion,
        lateral: cam.imagenLateralCamion, 
        traccion: cam.traccionCamion,
        longitudMax: cam.longitudMaxCamion,
        ejes: cam.ejeCamion,
        peso: cam.pesoCamion,
        tipo: cam.tipoCamion,
        disponible: cam.disponibleCamion,
        annio : cam.annioCamion
    };
};

// de Front a Backend:
const convertirCamionBackend = (cam) => { 
    return { 
        idCamion: cam.id,
        marcaCamion: cam.marca,
        nombreCamion: cam.nombre,
        motorCamion: cam.motor,
        descripcionCamion: cam.descripcion,
        imagenCamion: cam.imagen,
        imagenLateralCamion: cam.lateral,
        traccionCamion: cam.traccion,
        longitudMaxCamion: cam.longitudMax,
        ejeCamion: cam.ejes,
        pesoCamion: cam.peso,
        tipoCamion: cam.tipo,
        disponibleCamion: cam.disponible,
        annioCamion: cam.annio
    };
};

export const camionService = { 
    
    // Para clientes: Obtener todos los camiones y traducirlos, solo los disponibles
    getAllCamiones: async () => { 
        const response = await axios.get(`${BASE_URL}`);
        return response.data.map(traduccionCamion);
        // Recorre el array y aplica la funcion.
    },

    // Obtiene un camion por ID y lo traduce.
    getCamion: async (id) => { 
        const response = await axios.get(`${BASE_URL}/${id}`);
        return traduccionCamion(response.data);
    },

    getAdminCamiones: async () => {
        const response = await axios.get(`${BASE_URL}/admin/todos`);
        return response.data.map(traduccionCamion);
    },

    updateCamion: async (id, camionFrontend) => { 
        // Convertimos los datos al formato que se espera
        const camionBackend = convertirCamionBackend(camionFrontend);

        // Enviamos a la ruta adm correcta
        const response = await axios.put(`${BASE_URL}/admin/${id}`, camionBackend);
        return traduccionCamion(response.data);
    },

    

    // Lo dejamos por ahora
    createCamion: async (data) => { 
        return axios.post(BASE_URL,data);
    },
    deleteCamion: async (id) => { 
        return axios.delete(`${BASE_URL}/${id}`);
    }
};