import React from 'react'
import { useCarrito } from '../context/CarritoContext'
import Carrito from '../components/ui/Carrito'
import { cotizacionService } from '../services/cotizacionService'

const REGIONES_CHILE = [
    'Valparaíso',
    'Metropolitana de Santiago',
    'La Araucanía',
    'Aysén del Gral. Carlos Ibáñez del Campo',
    'Magallanes y de la Antártica Chilena',
]

const Cotizacion = () => {
    const { items, quitarItem } = useCarrito()

    // Estado del formulario
    const [form, setForm] = React.useState({
        nombre: '',
        rut: '',
        telefono: '',
        email: '',
        region: '',
        fechaInicio: ''
    })
    const [err, setErr] = React.useState('')
    const [enviando, setEnviando] = React.useState(false)
    const [exito, setExito] = React.useState('')

    const enviarFormulario = async (e) => {
        e.preventDefault()
        setErr('')
        setExito('')

        // Validaciones como es debido sss
        const { nombre, rut, telefono, email, region, fechaInicio } = form

        if (!nombre || !rut || !telefono || !email || !region || !fechaInicio) {
            setErr('Por favor, complete todos los campos requeridos.')
            return
        }

        // validacion sencilla: debe seleccionar una region (no string vacio)
        if (!REGIONES_CHILE.includes(region)) {
            setErr('Seleccione una región válida.')
            return
        }

        if (!email.includes('@') || !email.includes('.')) {
            setErr('Por favor, ingrese un correo válido.')
            return
        }

        const soloDigitos = (telefono || '').replace(/\D/g, '')
        if (soloDigitos.length < 8) {
            setErr('Ingrese un número de contacto válido (al menos 8 dígitos).')
            return
        }

        // Debe haber al menos un equipo para cotizar
        if (items.length === 0) {
            setErr('Agregue al menos un equipo al carrito para cotizar.')
            return
        }

        // Fecha no puede ser anterior a hoy
        const hoy = new Date().toISOString().slice(0, 10)
        if (fechaInicio < hoy) {
            setErr('La fecha de inicio estimada no puede ser anterior a hoy.')
            return
        }

        // Enviar al microservicio
        try {
            setEnviando(true)
            const respuesta = await cotizacionService.crearCotizacion(form, items, null) // idUsuario null (puede ser anonimo)
            // Puedes usar respuesta para mostrar número o id si backend lo retorna.
            setExito('Solicitud de cotización enviada. ¡Te contactaremos pronto!')
            // limpieza basica de formulario
            setForm({ 
                nombre: '',
                rut: '', 
                telefono: '', 
                email: '', 
                region: '', 
                fechaInicio: '' })
            
            // vaciar carrito (usuario puede no estar logeado)
            try {
                items.forEach((it) => quitarItem(it.lineaId ?? it.id))
            } catch {}
        } catch (error) {
            console.error(error)
            setErr('Ocurrió un error al enviar la cotización. Intente nuevamente.')
        } finally {
            setEnviando(false)
        }
    }

    const onChange = (e) => {
        const { name, value } = e.target
        setErr('')
        setForm((f) => ({ ...f, [name]: value }))
    }

    return (
        <div className="container my-4">
            <div className="row g-4">
                
                <div className="col-12 col-lg-7">
                    <h2 className="mb-3">🛒 Carro de Cotización</h2>
                    <p className="text-body-secondary">¡Ya casi terminas tu proceso de solicitud de cotización!</p>
                    <form className="row g-3" onSubmit={enviarFormulario} noValidate>
                        <div className="col-12 col-md-6">
                            <label className="form-label" htmlFor="nombre-input">Nombre o Razón Social</label>
                            <input 
                                id="nombre-input" 
                                type="text" 
                                className="form-control" 
                                name="nombre" 
                                value={form.nombre} 
                                onChange={onChange} 
                                required />
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label" htmlFor="rut-input">RUT</label>
                            <input 
                                id="rut-input" 
                                type="text" 
                                className="form-control" 
                                name="rut" 
                                value={form.rut} 
                                onChange={onChange} 
                                placeholder="12345678-9" />
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label" htmlFor="telefono-input">Número de contacto</label>
                            <input 
                                id="telefono-input" 
                                type="tel" 
                                className="form-control" 
                                name="telefono" 
                                value={form.telefono} 
                                onChange={onChange} 
                                placeholder="Ej: 912345678" 
                                required />
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label" htmlFor="email-input">E-Mail</label>
                            <input 
                                id="email-input" 
                                type="email" 
                                className="form-control" 
                                name="email" 
                                value={form.email} 
                                onChange={onChange} 
                                placeholder="ejemplo@correo.cl" 
                                required />
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label" htmlFor="region-select">Región donde opera</label>
                            <select 
                                id="region-select" 
                                className="form-select" 
                                name="region" 
                                value={form.region} 
                                onChange={onChange} 
                                required>
                                <option value="" disabled>Seleccione una región</option>
                                {REGIONES_CHILE.map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 col-md-6">
                            <label className="form-label" htmlFor="fechaInicio-input">Fecha de inicio Estimada</label>
                            <input 
                                id="fechaInicio-input" 
                                type="date" 
                                className="form-control" 
                                name="fechaInicio" 
                                value={form.fechaInicio} 
                                onChange={onChange} 
                                min={new Date().toISOString().slice(0,10)} 
                                required/>
                        </div>
                        {err && (
                            <div className="col-12">
                                <div className="alert alert-danger" role="alert">{err}</div>
                            </div>
                        )}
                        {exito && (
                            <div className="col-12">
                                <div className="alert alert-success" role="alert">{exito}</div>
                            </div>
                        )}
                            <div className="col-12">
                            <button className="btn boton-formulario" type="submit" disabled={enviando} onClick={enviarFormulario}>
                                {enviando ? 'Enviando...' : 'Enviar'}
                            </button>
                        </div>
                    </form>
                </div>

                <Carrito />
            </div>
        </div>
    )
}

export default Cotizacion
