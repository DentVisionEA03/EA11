import apiService from './apiService';

class ProductService {
  // Obtener todos los productos
  async getAllProducts(params = {}) {
    try {
      const response = await apiService.get('/productos', params);
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Obtener un producto por ID
  async getProductById(id) {
    try {
      const response = await apiService.get(`/productos/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  // Crear un nuevo producto
  async createProduct(productData) {
    try {
      const response = await apiService.post('/productos', productData);
      return response;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // Actualizar un producto
  async updateProduct(id, productData) {
    try {
      const response = await apiService.put(`/productos/${id}`, productData);
      return response;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  // Eliminar un producto
  async deleteProduct(id) {
    try {
      const response = await apiService.delete(`/productos/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // Buscar productos
  async searchProducts(query, filters = {}) {
    try {
      const params = { q: query, ...filters };
      const response = await apiService.get('/productos/search', params);
      return response;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  // Obtener productos por categoría
  async getProductsByCategory(categoryId) {
    try {
      const response = await apiService.get(`/productos/categoria/${categoryId}`);
      return response;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }

  // Obtener productos destacados
  async getFeaturedProducts() {
    try {
      const response = await apiService.get('/productos/destacados');
      return response;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  }

  // Subir imagen de producto
  async uploadProductImage(productId, formData) {
    try {
      const response = await apiService.upload(`/productos/${productId}/imagen`, formData);
      return response;
    } catch (error) {
      console.error('Error uploading product image:', error);
      throw error;
    }
  }

  // Actualizar stock de producto
  async updateProductStock(id, stock) {
    try {
      const response = await apiService.patch(`/productos/${id}/stock`, { stock });
      return response;
    } catch (error) {
      console.error('Error updating product stock:', error);
      throw error;
    }
  }

  // Obtener estadísticas de productos
  async getProductStats() {
    try {
      const response = await apiService.get('/productos/stats');
      return response;
    } catch (error) {
      console.error('Error fetching product stats:', error);
      throw error;
    }
  }
}

export default new ProductService();
