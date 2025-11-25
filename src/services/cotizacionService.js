import axios from "axios";

// IP Elastica
const BASE_URL = "http://3.208.33.39:8080/api/cotizaciones";

export const cotizacionService = { 
    
    // Enviar Cotizacion (Cliente)
    crearCotizacion: async (formulario, itemsCarrito, idUsuario = null) => { 

        // Transformamos los items del carrito al formato del backend.
        // Backend: {idCamion, fechaInicio, fechaFin, meses}
        const itemsBackend = itemsCarrito.map( item => ({ 
            idCamion: item.id,
            fechaInicio: item.fechas.inicio,
            fechaFin: item.fechas.fin,
            meses: item.meses
        }));

        // Transformamos el formulario al formato CotizacionRequestDTO (backend)
        const transformacion = { 
            nombreCliente: formulario.nombre,
            rutCliente: formulario.rut,
            telefonoCliente: formulario.telefono,
            emailCliente: formulario.email,
            region: formulario.region,
            fechaInicioEstimada: formulario.fechaInicio,
            idUsuario: idUsuario, // Puede ser null si no esta logeado.
            items: itemsBackend
        };

        const response = await axios.post(BASE_URL, transformacion);
        return response.data;
    },

    // Ver todas (en Admin)
    obtenerTodas: async () => { 
        const response = await axios.get(`${BASE_URL}/admin`);
        return response.data;
    },

    // Cambiar estado (en Admin)
    cambiarEstado: async (id, nuevoEstado) => { 
        // Enviamos el estado como parametro
        const response = await axios.put(`${BASE_URL}/admin/${id}/estado`, null, { 
            params: {estado: nuevoEstado}
        });
        return response.data;
    },

    // Eliminar (en Admin)
    eliminarCotizacion: async (id) => { 
        await axios.delete(`${BASE_URL}/${id}`)
    }
};