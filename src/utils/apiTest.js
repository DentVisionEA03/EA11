// Utilidad para probar la conexión con la API
import ApiService from '../services/apiService';
import UsuarioService from '../services/usuarioService';
import ProductoService from '../services/productoService';

export const testAPIConnection = async () => {
  console.log('🔍 Probando conexión con la API...');
  
  try {
    // Test 1: Verificar si el servidor responde
    console.log('📍 Test 1: Verificando servidor...');
    const response = await fetch('http://localhost:8080/usuarios');
    console.log('✅ Servidor responde:', response.status, response.statusText);
    
    // Test 2: Intentar listar usuarios
    console.log('📍 Test 2: Listando usuarios...');
    const usuarios = await UsuarioService.listar();
    console.log('✅ Usuarios obtenidos:', usuarios.length, 'registros');
    
    // Test 3: Intentar listar productos
    console.log('📍 Test 3: Listando productos...');
    const productos = await ProductoService.listar();
    console.log('✅ Productos obtenidos:', productos.length, 'registros');
    
    return {
      success: true,
      usuarios: usuarios.length,
      productos: productos.length,
      message: 'Conexión exitosa con la API'
    };
    
  } catch (error) {
    console.error('❌ Error en la conexión:', error);
    
    // Analizar el tipo de error
    if (error.message.includes('Failed to fetch')) {
      return {
        success: false,
        error: 'CONNECTION_FAILED',
        message: 'No se puede conectar al servidor. Verifica que el backend esté corriendo en http://localhost:8080'
      };
    } else if (error.message.includes('CORS')) {
      return {
        success: false,
        error: 'CORS_ERROR',
        message: 'Error de CORS. El backend debe permitir solicitudes desde este origen.'
      };
    } else {
      return {
        success: false,
        error: 'API_ERROR',
        message: error.message
      };
    }
  }
};

// Función para probar desde la consola del navegador
window.testAPI = testAPIConnection;
console.log('🚀 Para probar la API, ejecuta: testAPI()');
