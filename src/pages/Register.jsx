import React, { useState } from 'react';
import { Card, Input, Button, Loading, HomeButton } from '../components';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
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
    
    if (!formData.name) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Register data:', formData);
      // Handle successful registration
    } catch (error) {
      console.error('Register error:', error);
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
            <Input
              type="text"
              label="Nombre Completo"
              name="name"
              placeholder="Juan Pérez"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
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
