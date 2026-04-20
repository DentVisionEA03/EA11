import ApiService from './apiService';

class UsuarioService {
  // Listar todos los usuarios
  async listar() {
    return await ApiService.get('/usuarios');
  }

  // Obtener usuario por ID
  async obtenerPorId(id) {
    return await ApiService.get(`/usuarios/${id}`);
  }

  // Crear nuevo usuario
  async crear(usuario) {
    return await ApiService.post('/usuarios', usuario);
  }

  // Actualizar usuario
  async actualizar(id, usuario) {
    return await ApiService.put(`/usuarios/${id}`, usuario);
  }

  // Eliminar usuario
  async eliminar(id) {
    return await ApiService.delete(`/usuarios/${id}`);
  }
}

export default new UsuarioService();
