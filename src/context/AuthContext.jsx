import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // rehidratar usuario guardado
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser)); // Permite que la sesión persista tras recargar
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    // Register: Guarda el usuario en LocalStorage (Lista "USERS"), evita duplicados y hace login automatico

    const register = async (userData) => { 
        
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const newCorreo = (userData.inputCorreo || "").trim().toLowerCase();

        // Verificar si el correo ya está registrado
        const duplicate = users.find(
            (u) => (u.correo || u.email || "").trim().toLowerCase() === newCorreo
        );
        if (duplicate) {
            throw new Error("El correo ya está registrado.");
        }

        const newUser = { 
            nombre: (userData.inputNombre || "").trim(),
            rut: (userData.inputRut || "").trim(),
            correo: newCorreo,
            telefono: (userData.inputTelefono || "").trim(),
            password: userData.inputPassword || ""
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Login automático tras registro
        login(newUser);
        return newUser;
    }
    return (
        <AuthContext.Provider value={{ user, login, logout , register}}>
        {children}
        </AuthContext.Provider>
    );
}