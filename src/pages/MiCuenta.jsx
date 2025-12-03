import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const MiCuenta = () => { 
    const { user, logout, updateUserContext } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({ 
        nombreUsuario: user?.nombreUsuario || '',
        telefonoUsuario: user?.telefonoUsuario || '',
        // Importante: la contraseña no se carga por seguridad
        passwordUsuario: '', 
        confirmPassword: ''
    });

    const [message, setMessage] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Si el usuario no está log, rediriga al login 
    if (!user) { 
        return navigate('/login');
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
}