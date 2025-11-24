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

            // Llamamos a login pasando los datos directamente
            // El context se encarga de hablar con el nackend y validar
            const usuarioLogeado = await login(correo, password);

            // Redirigimos segun el rol que nos devolvió el contexto.
            if (usuarioLogeado.isAdmin) { 
                navigate("/Administrador")
            } else { 
                navigate("/Inicio")
            }

        } catch (err) {
            console.error(err)
            setError("Correo o contraseña incorrectos.");
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
