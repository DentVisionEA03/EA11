import ApiService from './apiService';

class ProductoService {
  // Listar todos los productos
  async listar() {
    return await ApiService.get('/productos');
  }

  // Obtener producto por ID
  async obtenerPorId(id) {
    return await ApiService.get(`/productos/${id}`);
  }

  // Crear nuevo producto
  async crear(producto) {
    return await ApiService.post('/productos', producto);
  }

  // Actualizar producto
  async actualizar(id, producto) {
    return await ApiService.put(`/productos/${id}`, producto);
  }

  // Eliminar producto
  async eliminar(id) {
    return await ApiService.delete(`/productos/${id}`);
  }
}

export default new ProductoService();
