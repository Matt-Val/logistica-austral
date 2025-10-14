
function Login() {
    const handleLogin = () => {
        console.log('Boton Ingresar presionado, se hace el submit')
    }
    // NOTA: el boton ingresar, manejarlo como type="submit" en el futuro, en vez de type="button"
    return (
    <>
        <main className="login-bg">
            <div className="caja">
                <h3 className="text-grande-formulario text-center mb-4">Inicio de Sesión</h3>
                <p className="text-center text-secondary mb-4">Por favor, ingrese su correo y contraseña para acceder a su cuenta.</p>
                <form>
                    <div className="mb-3">
                        <label className="text-grande-formulario">Correo</label>
                        <input type="text" id="mailLabel" className="form-control" placeholder="Ingrese su correo" />
                    </div>

                    <div className="mb-3">
                        <label className="text-grande-formulario">Contraseña</label>
                        <input type="password" id="passwordLabel" className="form-control" placeholder="Ingrese su contraseña" />
                    </div>

                    <div className="text-center">
                        <button type="button" onClick={handleLogin} className="btn-registrarse">Ingresar</button>
                    </div>
                </form>
            </div>
        </main>
    </>
    )
}

export default Login