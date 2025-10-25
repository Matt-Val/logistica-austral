import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
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

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("authUser", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("authUser");
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