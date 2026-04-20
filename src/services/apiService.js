// Base URL de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Servicio genérico de API
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Obtener headers con token
  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Manejar errores
  async handleResponse(response) {
    let data;
    
    try {
      data = await response.json();
    } catch {
      // Si no es JSON, intentar como texto
      try {
        const text = await response.text();
        data = { message: text };
      } catch {
        data = { message: response.statusText || 'Error desconocido' };
      }
    }

    if (!response.ok) {
      // Si es error de autenticación, limpiar token
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      
      throw new Error(data.message || `HTTP Error: ${response.status}`);
    }

    return data;
  }

  // Método GET
  async get(endpoint, params = {}) {
    try {
      const url = new URL(`${this.baseURL}${endpoint}`);
      
      // Agregar parámetros a la URL
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          url.searchParams.append(key, params[key]);
        }
      });

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.getHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('GET request error:', error);
      throw error;
    }
  }

  // Método POST
  async post(endpoint, data = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('POST request error:', error);
      throw error;
    }
  }

  // Método PUT
  async put(endpoint, data = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('PUT request error:', error);
      throw error;
    }
  }

  // Método PATCH
  async patch(endpoint, data = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('PATCH request error:', error);
      throw error;
    }
  }

  // Método DELETE
  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('DELETE request error:', error);
      throw error;
    }
  }

  // Upload de archivos
  async upload(endpoint, formData) {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        ...(token && { Authorization: `Bearer ${token}` })
      };

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  // Download de archivos
  async download(endpoint, filename) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  }
}

export default new ApiService();
