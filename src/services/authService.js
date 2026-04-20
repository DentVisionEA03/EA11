// Base URL de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Servicio de autenticación
class AuthService {
  // Obtener headers con token
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Login
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      let data;
      try {
        data = await response.json();
      } catch {
        try {
          const text = await response.text();
          data = { message: text };
        } catch {
          data = { message: response.statusText || 'Error al iniciar sesión' };
        }
      }

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Guardar token y usuario en localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Register - usa el endpoint de usuarios
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      let data;
      try {
        data = await response.json();
      } catch {
        try {
          const text = await response.text();
          data = { message: text };
        } catch {
          data = { message: response.statusText || 'Error al registrarse' };
        }
      }

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrarse');
      }

      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        console.warn('Logout request failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Siempre limpiar el storage local
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Refresh token
  async refreshToken() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al refrescar token');
      }

      // Actualizar token en localStorage
      localStorage.setItem('token', data.token);
      
      return data;
    } catch (error) {
      console.error('Refresh token error:', error);
      // Si falla el refresh, hacer logout
      this.logout();
      throw error;
    }
  }

  // Verificar token
  async verifyToken() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      return response.ok;
    } catch (error) {
      console.error('Verify token error:', error);
      return false;
    }
  }

  // Cambiar contraseña
  async changePassword(passwordData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(passwordData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al cambiar contraseña');
      }

      return data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  // Recuperar contraseña
  async forgotPassword(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar email de recuperación');
      }

      return data;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  // Resetear contraseña
  async resetPassword(resetData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al resetear contraseña');
      }

      return data;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }
}

export default new AuthService();
