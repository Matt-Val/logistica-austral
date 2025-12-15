import React, { useState } from 'react';

import '../css/MiCuenta.css';

const MiCuenta = () => { 
    const [password, setPassword] = useState({ current: '', new: '', confirm: ''});

    const handleChange = (e) => { 
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    return (
        <div className="cuenta-container">

            <div className="section-wrapper">
                <div className="section-header">

                </div>

                <div className="section-title">
                    <h2>Seguridad</h2>
                    <p>Actualiza tu contraseña y configuración de seguridad.</p>
                </div>
            </div>

            <div className="card">
                <div className="form-group">
                    <label>Contrasennia Actual</label>
                    <input 
                        className="form-input" 
                        type= "password"
                        name="current"
                        placeholder="******"
                        value={password.current}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Nueva Contrasennia</label>
                    <input 
                        className="form-input"
                        type="password"
                        name="new"
                        placeholder="******"
                        value={password.new}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Confirmar Contrasennia</label>
                    <input 
                        className="form-input"
                        type="password"
                        name="confirm"
                        placeholder="******"
                        value={password.confirm}
                        onChange={handleChange}
                    />
                </div>

                <div className="btn-container">
                    <button className="btn btn-primary">Actualizar Contrasennia</button>
                </div>
            </div>
        
            <div className="danger-zone">
                <div className="danger-header">
                    <div className="danger-title">
                        <div className="danger-icon-box">
                        </div>
                    
                        <h3>Zona de Peligro</h3>
                    </div>

                    <p>Acciones irreversibles en tu cuenta</p>
                </div>

                <div className="danger-body">
                    <h4>Eliminar Cuenta</h4>
                    <p>Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor asegúrate de que realmente deseas esto</p>

                    <ul className="danger-list">
                        <li>Se eliminarán todos tus datos personales</li>
                        <li>Se cancelarán todos tus envíos pendientes</li>
                        <li>Perderás acceso al historial de seguimiento</li>
                        <li>Esta acción no se puede deshacer</li>
                    </ul>

                    <button className="btn btn-danger" onClick={() => alert("Cuidado!")}> Eliminar Mi Cuenta</button>
                </div>
            </div>
        </div>
    );
};

export default MiCuenta;