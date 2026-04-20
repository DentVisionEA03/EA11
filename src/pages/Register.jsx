import React, { useState } from 'react';
import { Card, Input, Button, Loading, HomeButton } from '../components';
import UsuarioService from '../services/usuarioService';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.length < 2 || formData.nombre.length > 50) {
      newErrors.nombre = 'El nombre debe tener entre 2 y 50 caracteres';
    }
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    try {
      const { confirmPassword, ...userData } = formData;
      const response = await UsuarioService.crear(userData);
      console.log('Usuario creado:', response);
      alert('Usuario registrado exitosamente');
      // Reset form
      setFormData({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Register error:', error);
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <Card 
          title="Crear Cuenta" 
          subtitle="Regístrate para comenzar a usar nuestros servicios"
          className="register-card"
          padding="large"
          headerExtra={<HomeButton variant="ghost" size="small" />}
        >
          <form onSubmit={handleSubmit} className="register-form">
            {errors.submit && (
              <div className="error-message" style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center' }}>
                {errors.submit}
              </div>
            )}
            <Input
              type="text"
              label="Nombre Completo"
              name="nombre"
              placeholder="Juan Pérez"
              value={formData.nombre}
              onChange={handleChange}
              error={errors.nombre}
              required
            />
            
            <Input
              type="email"
              label="Email"
              name="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            
            <Input
              type="password"
              label="Contraseña"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
            
            <Input
              type="password"
              label="Confirmar Contraseña"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />
            
            <div className="register-options">
              <label className="terms-agreement">
                <input type="checkbox" required />
                <span>Acepto los <a href="#">términos y condiciones</a></span>
              </label>
            </div>
            
            <Button 
              type="submit" 
              variant="primary" 
              size="large" 
              disabled={isLoading}
              className="register-button"
            >
              {isLoading ? <Loading text="Creando cuenta..." /> : 'Crear Cuenta'}
            </Button>
            
            <div className="register-footer">
              <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
