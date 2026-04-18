import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/apiService';

// Hook personalizado para manejar llamadas a la API
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función genérica para hacer peticiones
  const request = useCallback(async (apiCall, ...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall(...args);
      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err.message || 'Error en la petición';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Métodos específicos
  const get = useCallback((endpoint, params) => {
    return request(apiService.get, endpoint, params);
  }, [request]);

  const post = useCallback((endpoint, data) => {
    return request(apiService.post, endpoint, data);
  }, [request]);

  const put = useCallback((endpoint, data) => {
    return request(apiService.put, endpoint, data);
  }, [request]);

  const patch = useCallback((endpoint, data) => {
    return request(apiService.patch, endpoint, data);
  }, [request]);

  const del = useCallback((endpoint) => {
    return request(apiService.delete, endpoint);
  }, [request]);

  const upload = useCallback((endpoint, formData) => {
    return request(apiService.upload, endpoint, formData);
  }, [request]);

  const download = useCallback((endpoint, filename) => {
    return request(apiService.download, endpoint, filename);
  }, [request]);

  // Limpiar error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    get,
    post,
    put,
    patch,
    delete: del,
    upload,
    download,
    clearError
  };
};

// Hook para manejar datos con paginación
export const usePaginatedApi = (endpoint, initialParams = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [params, setParams] = useState(initialParams);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiService.get(endpoint, { ...params, ...pagination });
      setData(result.data || []);
      setPagination(prev => ({
        ...prev,
        total: result.total || 0,
        totalPages: result.totalPages || 0
      }));
    } catch (err) {
      setError(err.message || 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  }, [endpoint, params, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const nextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const prevPage = () => {
    if (pagination.page > 1) {
      setPagination(prev => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const goToPage = (page) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const updateParams = (newParams) => {
    setParams(prev => ({ ...prev, ...newParams }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset a primera página
  };

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    pagination,
    nextPage,
    prevPage,
    goToPage,
    updateParams,
    refetch
  };
};

export default useApi;
