import axios from "axios";

const BASE_URL = "http://3.208.33.39:8080/api/auth"; // IP Elastica

/*
    Por que se cambia la carpeta de data a services. =>
        La carpeta Data se suele usar para informacion estatica o fija, como por ejemplo que teniamos camiones.js
        que es una lista.

        La carpeta service se usa para la logica que conecta con el exterior, busca los datos, los procesa y los trae.
*/

export const authService = { 

    // Login: Envia correo y password hacia el backend.
    login: async (correo, password) => { 

        const response = await axios.post(`${BASE_URL}/login`, {correo, password});
        return response.data; // Retorna el usuario.
    },

    /*
    Registro: Traduce los nombres de formulario a los del backend (son diferentes)
    Problema: Conflicto de nombres entre el backend y frontend
    */
    register: async (reg) => { 
        const usuarioBackend = { 
            nombreUsuario: reg.inputNombre,
            rutUsuario: reg.inputRut,
            correoUsuario: reg.inputCorreo,
            telefonoUsuario: reg.inputTelefono,
            passwordUsuario: reg.inputPassword
        };
        const response = await axios.post(`${BASE_URL}/registro`, usuarioBackend);
        return response.data;
    },

    // Registro Admin:
    registerAdmin: async (reg) => { 
        const usuarioBackend = { 
            nombreUsuario: reg.inputNombre,
            rutUsuario: reg.inputRut,
            correoUsuario: reg.inputCorreo,
            telefonoUsuario: reg.inputTelefono,
            passwordUsuario: reg.inputPassword
        };
        const response = await axios.post(`${BASE_URL}/registro-admin`, usuarioBackend);
        return response.data;
    },

    updateProfile: async (id, datosUsuario) => {
        try { 
            const response = await axios.put(`${BASE_URL}/usuarios/${id}`, datosUsuario)
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error("Error al actualizar el perfil");
        }
    },

    deleteAccount: async (id) => {
        try { 
            await axios.delete(`${BASE_URL}/usuarios/${id}`);
            return true;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Error de conexión');
        }
    }
}
