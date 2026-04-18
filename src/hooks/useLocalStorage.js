import { useState, useEffect } from 'react';

// Hook personalizado para manejar localStorage
export const useLocalStorage = (key, initialValue) => {
  // Obtener valor inicial del localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para actualizar el valor
  const setValue = (value) => {
    try {
      // Permitir que el valor sea una función (como useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Guardar en el estado
      setStoredValue(valueToStore);
      
      // Guardar en localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Remover item del localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  // Sincronizar con cambios en otras pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
        } catch (error) {
          console.error(`Error parsing localStorage change for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

// Hook para manejar múltiples valores en localStorage
export const useLocalStorageObject = (initialValue = {}) => {
  const [values, setValues] = useLocalStorage('app-storage', initialValue);

  const updateValue = (key, value) => {
    setValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const removeKey = (key) => {
    setValues(prev => {
      const newValues = { ...prev };
      delete newValues[key];
      return newValues;
    });
  };

  const clearAll = () => {
    setValues({});
  };

  return {
    values,
    updateValue,
    removeKey,
    clearAll,
    setValues
  };
};

// Hook para manejar preferencias de usuario
export const useUserPreferences = (defaultPreferences = {}) => {
  const [preferences, setPreferences] = useLocalStorage('user-preferences', defaultPreferences);

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return {
    preferences,
    updatePreference,
    resetPreferences,
    setPreferences
  };
};

export default useLocalStorage;
