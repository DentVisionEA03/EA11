import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

// Hook para manejar formularios
export const useForm = (initialValues = {}, validationSchema = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    const newValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  // Manejar blur para marcar campos como tocados
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validar campo específico
    if (validationSchema[name]) {
      const error = validationSchema[name](values[name], values);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [values, validationSchema]);

  // Validar todo el formulario
  const validate = useCallback(() => {
    const newErrors = {};
    
    Object.keys(validationSchema).forEach(key => {
      const error = validationSchema[key](values[key], values);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    return Object.keys(newErrors).length === 0;
  }, [values, validationSchema]);

  // Manejar submit
  const handleSubmit = useCallback(async (onSubmit) => {
    if (!validate()) {
      return false;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
      return true;
    } catch (error) {
      console.error('Form submit error:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate]);

  // Resetear formulario
  const reset = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Establecer valor específico
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Establecer error específico
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  // Obtener valor con debounce
  const debouncedValues = useDebounce(values, 300);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    debouncedValues,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
    validate,
    isValid: Object.keys(errors).length === 0
  };
};

// Validadores comunes
export const validators = {
  required: (message = 'Este campo es requerido') => (value) => {
    return !value || value.toString().trim() === '' ? message : '';
  },
  
  email: (message = 'Email inválido') => (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return value && !emailRegex.test(value) ? message : '';
  },
  
  minLength: (min, message) => (value) => {
    return value && value.length < min ? (message || `Mínimo ${min} caracteres`) : '';
  },
  
  maxLength: (max, message) => (value) => {
    return value && value.length > max ? (message || `Máximo ${max} caracteres`) : '';
  },
  
  password: (message = 'Contraseña inválida') => (value) => {
    // Al menos 8 caracteres, una mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return value && !passwordRegex.test(value) ? message : '';
  },
  
  match: (fieldName, message) => (value, allValues) => {
    return value !== allValues[fieldName] ? (message || `No coincide con ${fieldName}`) : '';
  },
  
  phone: (message = 'Teléfono inválido') => (value) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return value && !phoneRegex.test(value) ? message : '';
  },
  
  url: (message = 'URL inválida') => (value) => {
    try {
      if (value) {
        new URL(value);
      }
      return '';
    } catch {
      return message;
    }
  },
  
  numeric: (message = 'Debe ser un número') => (value) => {
    return value && isNaN(Number(value)) ? message : '';
  },
  
  positive: (message = 'Debe ser positivo') => (value) => {
    return value && Number(value) <= 0 ? message : '';
  }
};

export default useForm;
