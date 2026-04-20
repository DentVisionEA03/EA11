import React, { useState } from 'react';
import { Card, Button, Input, Loading, HomeButton } from '../components';
import './AddProduct.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    sku: '',
    image: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    'Electrónicos',
    'Ropa',
    'Alimentos',
    'Hogar',
    'Deportes',
    'Libros',
    'Otros'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del producto es requerido';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }
    
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }
    
    if (!formData.category) {
      newErrors.category = 'Debe seleccionar una categoría';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally make an API call to save the product
      console.log('Producto a guardar:', formData);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        sku: '',
        image: ''
      });
      
      alert('Producto agregado exitosamente!');
    } catch (error) {
      console.error('Error al agregar producto:', error);
      alert('Error al agregar el producto. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Reset form and go back to dashboard
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      sku: '',
      image: ''
    });
    setErrors({});
  };

  return (
    <div className="add-product-page">
      <div className="add-product-header">
        <div className="add-product-header-content">
          <div>
            <h1>Agregar Nuevo Producto</h1>
            <p>Complete el formulario para agregar un nuevo producto al inventario</p>
          </div>
          <HomeButton variant="secondary" size="medium" />
        </div>
      </div>

      <Card className="add-product-card">
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-row">
            <div className="form-group">
              <Input
                label="Nombre del Producto *"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: Laptop Dell Inspiron"
                error={errors.name}
                required
              />
            </div>
            
            <div className="form-group">
              <Input
                label="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="Ej: LAP-001"
                error={errors.sku}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="input-label">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Descripción detallada del producto..."
              className="textarea-field"
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <Input
                label="Precio *"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                error={errors.price}
                required
              />
            </div>
            
            <div className="form-group">
              <Input
                label="Stock *"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                error={errors.stock}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category" className="input-label">
              Categoría *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`select-field ${errors.category ? 'select-field--error' : ''}`}
              required
            >
              <option value="">Seleccione una categoría</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="input-error">{errors.category}</span>
            )}
          </div>

          <div className="form-group">
            <Input
              label="URL de Imagen"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              error={errors.image}
            />
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loading type="spinner" size="small" />
                  Agregando...
                </>
              ) : (
                'Agregar Producto'
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
