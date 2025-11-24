import axios from "axios";

const BASE_URL = "http://100.25.39.68:8080/api/camiones";

/*
    Funcion auxiliar para traducir de backend al front.
    Problema: Conflicto de nombres entre el backend y frontend
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
        longitudMax: cam.longitudMaxCamion, // Ojo con este, es un string en bd.
        ejes: cam.ejeCamion,
        peso: cam.pesoCamion,
        tipo: cam.tipoCamion,
        disponible: cam.disponibleCamion
    };
};

export const camionService = { 
    
    // Obtiene todos los camiones y los traduce.
    getAllCamiones: async () => { 
        const response = await axios.get(BASE_URL);
        return response.data.map(traduccionCamion);
        // Recorre el array y aplica la funcion.
    },

    // Obtiene un camion por ID y lo traduce.
    getCamion: async (id) => { 
        const response = await axios.get(`${BASE_URL}/${id}`);
        return traduccionCamion(response.data);
    },

    // Lo dejamos por ahora
    createCamion: async (data) => { 
        return axios.post(BASE_URL,data);
    },

    updateCamion: async (id, data) => { 
        return axios.put(`${BASE_URL}/${id}`, data);
    },

    deleteCamion: async (id) => { 
        return axios.delete(`${BASE_URL}/${id}`);
    }
};