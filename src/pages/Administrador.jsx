import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import { authService } from "../services/authService";

const ADMIN_EMAIL = "javier.pena@logistica.com"

export default function Administrador() { 
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // 1.- Autenticación
    if (!user) { 
        return <Navigate to="/login" replace />;
    }

    // 2.- Autorización Admin
    const normalized = String(user.correo || user.email || "").toLowerCase();
    const isAdmin = user?.isAdmin === true || normalized === ADMIN_EMAIL;
    
    if (!isAdmin) { 
        return <Navigate to="/login" replace />;
    }

    // 3.- Estados
    const [view, setView] = useState("inicio"); 
    
    const [form, setForm] = useState({
        inputNombre: "",
        inputRut: "",
        inputTelefono: "",
        inputCorreo: "",
        inputPassword: ""
    });

    const [formError, setFormError] = useState("");
    const [formOk, setFormOk] = useState("");

    // 4.- Manejadores
    const handleLogout = () => { 
        logout();
        navigate("/login", { replace: true });
    };

    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleVerArriendos = () => { 
        window.alert("Esta funcionalidad está en mantenimiento.");
    }

    const handleCrearAdmin = async (e) => {
        e.preventDefault();
        setFormError("");
        setFormOk("");

        // Validaciones
        if (!form.inputNombre || !form.inputRut || !form.inputCorreo || !form.inputPassword) { 
            setFormError("Por favor, complete todos los campos.");
            return;
        }
        if (!form.inputCorreo.includes("@") || !form.inputCorreo.includes(".")) { 
            setFormError("Por favor, ingrese un correo electrónico válido.");
            return;
        }
        if (form.inputPassword.length < 8 ) { 
            setFormError("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        try { 
            // Llamada al servicio
            await authService.registerAdmin(form);

            setFormOk("Usuario administrador creado exitosamente.");
            
            // Limpiar formulario
            setForm({ 
                inputNombre: "",
                inputRut: "",
                inputTelefono: "",
                inputCorreo: "",
                inputPassword: ""
            });
        } catch (error) { 
            console.error("Error al crear usuario admin: ", error);
            setFormError("Error al crear usuario. Verifique que el RUT o Correo no existan.");
        }
    }

    const toggleCrearUsuarios = () => { 
        setView((prev) => (prev === "crearUsuarios" ? "inicio" : "crearUsuarios"));
        setFormError("");
        setFormOk("");
    }
    return(
        <main className="admin-bg">
            <div className="admin-container-title">
                <div className="admin-header">
                    <h1 className="text-black bold text-center">Panel de Administrador</h1>

                    <div className="admin-layout">
                        <div className="admin-sidebar">
                            <div className="admin-sidebar-title">Gestión</div>
                            <button className="admin-nav-btn" onClick={() => navigate("/admin-camiones")}> Administrar Camiones</button>
                            <button className="admin-nav-btn" onClick={handleVerArriendos}> Ver Arriendos</button>
                            <button className="admin-nav-btn" onClick={toggleCrearUsuarios}> Crear Usuarios</button>
                            <hr/>
                            <button className="admin-nav-btn admin-nav-danger" onClick={handleLogout}>⎋ Cerrar sesión</button>
                        </div>

                        {view === "crearUsuarios" && (
                            <div className="admin-content">
                                <div className="d-flex justify-content-between align-items-start">
                                    <h2 className="text-black bold mb-3 justify-content">Crear usuario administrador</h2>
                                    <button type="button" className="btn-cerrar" onClick={toggleCrearUsuarios}></button>
                                </div>
                                    <p className="text-secondary mb-3">Ingrese correo y contraseña para crear una cuenta con privilegios de administrador.
                                    </p>
                                <form className="admin-form" onSubmit={handleCrearAdmin}>


                                    <div className="mb-2">
                                            <label className="text-grande-formulario">Nombre Completo</label>
                                            <input type="text" 
                                                className="form-control form-control-ssm" 
                                                name="inputNombre" 
                                                value={form.inputNombre}
                                                onChange={handleInput}
                                            />
                                    </div>

                                    <div className="row mb-2">
                                        <div className="col-6">
                                            <label className="text-grande-formulario">RUT</label>
                                            <input type="text" 
                                                className="form-control form-control-sm"
                                                name="inputRut"
                                                value={form.inputRut}
                                                onChange={handleInput}
                                                placeholder="12.345.678-9"
                                            />
                                        </div>

                                        <div className="col-6">
                                            <label className="text-grande-formulario">Fono</label>
                                            <input type="text" 
                                                className="form-control form-control-sm" 
                                                name="inputTelefono"
                                                value={form.inputTelefono}
                                                onChange={handleInput}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-2">
                                        <label className="texto-grande-formulario">Correo</label>
                                        <input type="email" 
                                            className="form-control form-control-sm"
                                            name="inputCorreo"
                                            value={form.inputCorreo}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="text-grande-formulario">Contraseña</label>
                                        <input type="password" 
                                            className="form-control form-control-sm"
                                            name="inputPassword"
                                            value={form.inputPassword}
                                            onChange={handleInput}
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