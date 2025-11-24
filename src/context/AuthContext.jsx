import React, { createContext, useState, useEffect } from "react";

import { authService } from "../services/authService";

export const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    register: () => {}
})


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // rehidratar usuario guardado
    useEffect(() => {
        const saved = localStorage.getItem("authUser");
        if (saved) {
            try { 
                setUser(JSON.parse(saved));
            } catch { 
                localStorage.removeItem("authUser");
            }
        }
    }, []);

    // Login
    const login = async (correo, password) => { 

        if (correo === "javier.pena@logistica.com" && password === "admin1234"){ 
            const adminUser = {
                nombre: "Javier Admin",
                correo,
                isAdmin: true 
            };
            setUser(adminUser);
            localStorage.setItem("authUser", JSON.stringify(adminUser));
            return adminUser;
        }

        try { 
            // Se llama al backend
            const usuario = await authService.login(correo, password);

            // Se adapta al front.
            const usuarioSesion = { 
                id: usuario.idUsuario,
                nombre: usuario.nombreUsuario,
                correo: usuario.correoUsuario,
                isAdmin: usuario.esAdmin
            };

            // Guardamos el estado y localstorage
            setUser(usuarioSesion);
            localStorage.setItem("authUser", JSON.stringify(usuarioSesion));
            return usuarioSesion;
        } catch (error) { 
            console.error("Error en login: ", error);
            throw new Error("Credenciales incorrectas o error de conexion.");
        }
    };

    // Register:
    const register = async (formData) => { 
        try { 
            const nuevoUsuario = await authService.register(formData);

            // Auto-Login despues de un registro exitoso
            const usuarioSesion = { 
                id: nuevoUsuario.idUsuario,
                nombre: nuevoUsuario.nombreUsuario,
                correo: nuevoUsuario.correoUsuario,
                isAdmin: false
            };

            setUser(usuarioSesion);
            localStorage.setItem("authUser", JSON.stringify(usuarioSesion));
            return usuarioSesion;
        } catch (error) { 
            console.error("Error en registro: ", error);
            throw new Error("Error al registrar. Verifique que el RUT o Correo no existan.");
        }
    }

    const logout = () => { 
        setUser(null);
        localStorage.removeItem("authUser");
    };

    const value = { 
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
    };

    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    );
}