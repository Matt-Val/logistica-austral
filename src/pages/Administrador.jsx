import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 

const ADMIN_EMAIL = "javier.pena@logistica.com"

export default function Administrador() { 
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // 1.- Si no hay usuario o no es admin, redirigir a login
    if (!user) { 
        return <Navigate to="/login" replace />;
    }

    // 2.- Validacion de administrador
    const isAdmin = String((user.correo || user.email || "")).toLowerCase() === ADMIN_EMAIL;
    if (!isAdmin) {
        return <Navigate to="/login" replace />;
    }

    const adminEmail = user.correo || user.email || ADMIN_EMAIL;

    // 3.- Cargar usuarios
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        try { 
            const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
            setUsers(Array.isArray(storedUsers) ? storedUsers : []);
        } catch (e)  { 
            setUsers([]);
        }
    }, []);

    const handleLogout = () => { 
        try { 
            logout();
        } catch (e) {
            console.error("Error al cerrar sesión:", e);
        }
        navigate("/login", { replace: true });
    };

    

    return(
        <main className="admin-bg">
            <div className="admin-container-title">
                <div className="admin-header">
                    <h1 className="text-black bold text-center">Panel de Administrador</h1>

                    <div className="admin-layout">
                        <div className="admin-sidebar">
                            <div className="admin-sidebar-title">Gestión</div>
                            <button className="admin-nav-btn" onClick={() => navigate("/")}>🚚 Administrar Camiones</button>
                            <button className="admin-nav-btn" onClick={() => navigate("/")}>📄 Ver Arriendos</button>
                            <button className="admin-nav-btn" onClick={() => navigate("/")}>👤 Crear Usuarios</button>
                            <hr/>
                            <button className="admin-nav-btn admin-nav-danger" onClick={handleLogout}>⎋ Cerrar sesión</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}