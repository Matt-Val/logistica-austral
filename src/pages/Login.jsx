import { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Credenciales del Administrador
const ADMIN_CREDENTIALS = { 
    correo: "javier.pena@logistica.com",
    password: "admin1234"
};


export default function Login() {
    const { login } = useContext(AuthContext);
    const [correo, setCorreo] = useState(""); 
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try{ 

            // Verificar si es el usuario administrador
            if (correo === ADMIN_CREDENTIALS.correo && password === ADMIN_CREDENTIALS.password) { 
                login({ ...ADMIN_CREDENTIALS, isAdmin: true }); // Actualiza el contexto de autenticación
                navigate("/Administrador"); // Redirige a la página de administración
                return;
            }
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            const foundUser = users.find(
                (u) => (u.correo === correo || u.email === correo) && u.password === password
            );

            if (foundUser) { 
                login(foundUser); // Actualiza el contexto de autenticación
                if(foundUser.isAdmin === true) { 
                    navigate("/Administrador"); // Redirige a la página de administración
                } else { 
                    navigate("/Inicio"); // Decidir a que pag ir tras el login.
                }
            } else { 
                setError("Correo o contraseña incorrectos.");
            }
        } catch (err) {
            setError("Error al iniciar sesión. Por favor, intente nuevamente.");
            return;
        }
    }
    return (
    <>
        <main className="login-bg">
            <div className="caja">
                <h3 className="text-grande-formulario text-center mb-4">Inicio de Sesión</h3>
                <p className="text-center text-secondary mb-4">Por favor, ingrese su correo y contraseña para acceder a su cuenta.</p>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="text-grande-formulario">Correo</label>
                        <input 
                            type="text" 
                            id="mailLabel" 
                            className="form-control" 
                            placeholder="Ingrese su correo" 
                            value= {correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="text-grande-formulario">Contraseña</label>
                        <input 
                            type="password" 
                            id="passwordLabel" 
                            className="form-control" 
                            placeholder="Ingrese su contraseña" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn-registrarse">Ingresar</button>
                    </div>
                    
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                </form>
            </div>
        </main>
    </>
    );
}
