import React, { useState } from 'react';
import { Card, Input, Button, Loading, HomeButton } from '../components';
import ProductoService from '../services/productoService';
import './ProductRegister.css';

const ProductRegister = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: ''
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
      newErrors.nombre = 'El nombre del producto es requerido';
    }
    
    if (!formData.descripcion) {
      newErrors.descripcion = 'La descripción es requerida';
    }
    
    if (!formData.precio) {
      newErrors.precio = 'El precio es requerido';
    } else if (isNaN(formData.precio) || parseFloat(formData.precio) <= 0) {
      newErrors.precio = 'El precio debe ser un número mayor a 0';
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
      const productData = {
        ...formData,
        precio: parseFloat(formData.precio)
      };
      const response = await ProductoService.crear(productData);
      console.log('Producto creado:', response);
      alert('Producto registrado exitosamente');
      // Reset form
      setFormData({
        nombre: '',
        descripcion: '',
        precio: ''
      });
    } catch (error) {
      console.error('Product register error:', error);
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-register-page">
      <div className="product-register-container">
        <Card 
          title="Registrar Producto" 
          subtitle="Agrega un nuevo producto al inventario"
          className="product-register-card"
          padding="large"
          headerExtra={<HomeButton variant="ghost" size="small" />}
        >
          <form onSubmit={handleSubmit} className="product-register-form">
            {errors.submit && (
              <div className="error-message" style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center' }}>
                {errors.submit}
              </div>
            )}
            
            <Input
              type="text"
              label="Nombre del Producto"
              name="nombre"
              placeholder="Ej: Laptop Dell XPS"
              value={formData.nombre}
              onChange={handleChange}
              error={errors.nombre}
              required
            />
            
            <Input
              type="textarea"
              label="Descripción"
              name="descripcion"
              placeholder="Describe las características del producto..."
              value={formData.descripcion}
              onChange={handleChange}
              error={errors.descripcion}
              required
              rows={4}
            />
            
            <Input
              type="number"
              label="Precio"
              name="precio"
              placeholder="0.00"
              value={formData.precio}
              onChange={handleChange}
              error={errors.precio}
              required
              step="0.01"
              min="0.01"
            />
            
            <Button 
              type="submit" 
              variant="primary" 
              size="large" 
              disabled={isLoading}
              className="product-register-button"
            >
              {isLoading ? <Loading text="Registrando producto..." /> : 'Registrar Producto'}
            </Button>
            
            <div className="product-register-footer">
              <p><a href="/dashboard">Volver al panel principal</a></p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProductRegister;
