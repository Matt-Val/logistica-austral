import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registro() { 
    const nav = useNavigate();
    const { register } = useAuth();
    
    const [form, setForm] = useState({
        inputNombre: "",
        inputRut: "",
        inputCorreo: "",
        inputTelefono: "",
        inputPassword: "",
        inputConfirmPassword: ""
    });

    const [err, setErr] = useState("");

    function onChange(e) { 
        setErr("");
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function onSubmit(e) { 
        e.preventDefault();
        setErr("");

        if (!form.inputNombre || !form.inputRut || !form.inputCorreo || !form.inputTelefono || !form.inputPassword || !form.inputConfirmPassword) {
            setErr("Por favor, complete todos los campos.");
            return;
        }

        const correo = form.inputCorreo.trim().toLowerCase();
        
        if (!correo.includes("@") || !correo.includes(".")) {
            setErr("Por favor, ingrese un correo válido");
            return;
        }

        if (form.inputPassword.length < 8) {
            setErr("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        if (form.inputPassword !== form.inputConfirmPassword) {
            setErr("Las contraseñas no coinciden.");
            return;
        }
        try { 
            await register({
                inputNombre: form.inputNombre.trim(),
                inputRut: form.inputRut.trim(),
                inputCorreo: correo, // La calculamos arriba, linea 34
                inputTelefono : form.inputTelefono.trim(),
                inputPassword: form.inputPassword
            });
            alert("Registro exitoso.");
            nav("/Inicio")
        } catch (e) { 
            setErr(e.message || "Error al registrarse.");
        }
    }

    return (
        <main className="d-flex justify-content-center align-items-center vh-100">
            <div className="caja">
                <form onSubmit={onSubmit}>
                    <label className="text-grande-formulario text-center d-block mb-4 fs-4">
                        Registro de Usuario
                    </label>

                    <div className="mb-3">
                        <label className="text-grande-formulario">Nombre Completo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombreLabel"
                            name="inputNombre"
                            placeholder="Ingrese su nombre completo"
                            value={form.inputNombre}
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="text-grande-formulario">RUT</label>
                        <input
                            type="text"
                            className="form-control"
                            id="rutLabel"
                            name="inputRut"
                            placeholder="Ingrese su RUT"
                            value={form.inputRut}
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="text-grande-formulario">Correo</label>
                        <input
                            type="email"
                            className="form-control"
                            id="correoLabel"
                            name="inputCorreo"
                            placeholder="Ingrese su correo electrónico"
                            value={form.inputCorreo}
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="text-grande-formulario">Teléfono</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="telefonoLabel"
                            name="inputTelefono"
                            placeholder="Ingrese su número de teléfono"
                            value={form.inputTelefono}
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="text-grande-formulario">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordLabel"
                            name="inputPassword"
                            placeholder="Ingrese su contraseña"
                            value={form.inputPassword}
                            onChange={onChange}
                        />
                    </div>

                    <div className= "mb-3">
                        <label className="text-grande-formulario">Confirmar Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPasswordLabel"
                            name="inputConfirmPassword"
                            placeholder="Confirme su contraseña"
                            value={form.inputConfirmPassword}
                            onChange={onChange}
                        />
                    </div>
                    
                    {err && <div className="alert alert-danger">{err}</div>}

                    <div className="text-center">
                        <button type="submit" className="btn-registrarse">Registrarse</button>
                    </div>
                </form>
            </div>

        </main>
    )
}