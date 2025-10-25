import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 

const ADMIN_EMAIL = "javier.pena@logistica.com"

export default function Administrador() { 
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // 1.- Autenticación y Autorización
    if (!user) { 
        return <Navigate to="/login" replace />;
    }

    const normalized = String(user.correo || user.email || "").toLowerCase();
    const isAdmin = user?.isAdmin === true || normalized === ADMIN_EMAIL;
    if (!isAdmin) { 
        return <Navigate to="/login" replace />;
    }

    // 2.- Estado de la Lista de usuarios y vista actual
    const [users, setUsers] = useState([]);
    const [view, setView] = useState("inicio"); 

    // 3.- Estados del formulario de creación de administradores.
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [formError, setFormError] = useState("");
    const [formOk, setFormOk] = useState("");


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

        const handleVerArriendos = () => { 
        window.alert("Esta funcionalidad está en mantenimiento, disculpe las molestias.");
    }

    const handleCrearAdmin = (e) => {
        e.preventDefault();
        setFormError("");
        setFormOk("");

        const email = adminEmail.trim().toLowerCase();
        const pass = adminPassword || "";

        //Validaciones básicas
        if (!email || !pass) { 
            setFormError("Por favor, complete todos los campos.");
            return;
        }
        if (!email.includes("@") || !email.includes(".")) { 
            setFormError("Por favor, ingrese un correo electrónico válido.");
            return;
        }
        if (pass.length < 8 ) { 
            setFormError("La contraseña debe tener al menos 8 caracteres,");
        }

        // Cargar y verificar duplicados
        let currentUsers = [];
        try { 
            currentUsers = JSON.parse(localStorage.getItem("users") || "[]");
            if (!Array.isArray(currentUsers)) currentUsers = [];
        } catch { 
            currentUsers = [];
        }

        const exists = currentUsers.find(
            (u) => String(u.correo || u.email || "").trim().toLowerCase() === email
        );
        if (exists) { 
            setFormError("Ya existe un usuario con ese correo electrónico.");
            return;
        }

        // Crear un nuevo usuario administrador
        const newAdmin = { 
            correo : email,
            password : pass,
            isAdmin : true,
            nombre : "",
            rut : "",
            telefono : "",
        };

        currentUsers.push(newAdmin);
        localStorage.setItem("users", JSON.stringify(currentUsers));
        setUsers(currentUsers);

        setFormOk("Usuario administrador creado exitosamente.");
        setAdminEmail("");
        setAdminPassword("");
    }

    const toggleCrearUsuarios = () => { 
        setView((prev) => (prev === "crearUsuarios" ? "inicio" : "crearUsuarios"))
    }

    return(
        <main className="admin-bg">
            <div className="admin-container-title">
                <div className="admin-header">
                    <h1 className="text-black bold text-center">Panel de Administrador</h1>

                    <div className="admin-layout">
                        <div className="admin-sidebar">
                            <div className="admin-sidebar-title">Gestión</div>
                            <button className="admin-nav-btn" onClick={() => navigate("/")}>🚚 Administrar Camiones</button>
                            <button className="admin-nav-btn" onClick={handleVerArriendos}>📄 Ver Arriendos</button>
                            <button className="admin-nav-btn" onClick={toggleCrearUsuarios}>👤 Crear Usuarios</button>
                            <hr/>
                            <button className="admin-nav-btn admin-nav-danger" onClick={handleLogout}>⎋ Cerrar sesión</button>
                        </div>

                        {view === "crearUsuarios" && (
                            <div className="admin-content">
                                <div className="d-flex justify-content-between align-items-start">
                                    <h2 className="text-black bold mb-3">Crear usuario administrador</h2>
                                    <button type="button" className="btn-cerrar" onClick={toggleCrearUsuarios}></button>
                                </div>
                                    <p className="text-secondary mb-3">Ingrese correo y contraseña para crear una cuenta con privilegios de administrador.</p>
                                <form className="admin-form" onSubmit={handleCrearAdmin}>
                                    <div className="mb-3">
                                        <label className="text-grande-formulario">Correo</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="admin@empresa.com"
                                            value={adminEmail}
                                            onChange={(e) => setAdminEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="text-grande-formulario">Contraseña</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Mínimo 8 caracteres"
                                            value={adminPassword}
                                            onChange={(e) => setAdminPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn-registrarse">Crear administrador</button>
                                    </div>

                                    {formError && (
                                        <div className="alert alert-danger mt-3">{formError}</div>
                                    )}
                                    {formOk && (
                                        <div className="alert alert-success mt-3">{formOk}</div>
                                    )}
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}