import React, { useState, useEffect } from 'react';
import { Card, Button, Loading, HomeButton } from '../components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import UsuarioService from '../services/usuarioService';
import ProductoService from '../services/productoService';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalSales: 0,
    pendingOrders: 0
  });
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Obtener usuarios y productos
        const usuariosData = await UsuarioService.listar();
        const productosData = await ProductoService.listar();
        
        setUsuarios(usuariosData);
        setProductos(productosData);
        setRecentProducts(productosData.slice(0, 6));
        
        // Actualizar estadísticas
        setStats({
          totalProducts: productosData.length,
          totalUsers: usuariosData.length,
          totalSales: productosData.reduce((sum, p) => sum + (p.precio || 0), 0),
          pendingOrders: 0
        });

        // Simular actividad reciente
        setRecentActivity([
          { id: 1, type: 'sale', description: 'Nuevo producto agregado', time: 'Hace 5 minutos' },
          { id: 2, type: 'user', description: 'Nuevo usuario registrado', time: 'Hace 15 minutos' },
          { id: 3, type: 'product', description: 'Producto actualizado', time: 'Hace 1 hora' },
          { id: 4, type: 'order', description: 'Sistema iniciado', time: 'Hace 2 horas' }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Usar datos simulados si hay error
        setStats({
          totalProducts: 0,
          totalUsers: 0,
          totalSales: 0,
          pendingOrders: 0
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleEliminarUsuario = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await UsuarioService.eliminar(id);
        const usuariosData = await UsuarioService.listar();
        setUsuarios(usuariosData);
        setStats(prev => ({ ...prev, totalUsers: usuariosData.length }));
        alert('Usuario eliminado exitosamente');
      } catch (error) {
        console.error('Error eliminando usuario:', error);
        alert('Error al eliminar usuario');
      }
    }
  };

  const handleEliminarProducto = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await ProductoService.eliminar(id);
        const productosData = await ProductoService.listar();
        setProductos(productosData);
        setRecentProducts(productosData.slice(0, 6));
        setStats(prev => ({ 
          ...prev, 
          totalProducts: productosData.length,
          totalSales: productosData.reduce((sum, p) => sum + (p.precio || 0), 0)
        }));
        alert('Producto eliminado exitosamente');
      } catch (error) {
        console.error('Error eliminando producto:', error);
        alert('Error al eliminar producto');
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      logout();
      navigate('/login');
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'sale':
        return '💰';
      case 'user':
        return '👤';
      case 'product':
        return '📦';
      case 'order':
        return '🛒';
      default:
        return '📄';
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <Loading text="Cargando dashboard..." />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div>
            <h1>Dashboard</h1>
            <p>Panel de gestión de usuarios y productos</p>
          </div>
          <div className="header-actions">
            <HomeButton variant="secondary" size="medium" />
          </div>
        </div>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-stats">
          <Card variant="primary" className="stat-card">
            <div className="stat-content">
              <div className="stat-icon">📦</div>
              <div className="stat-info">
                <h3>{stats.totalProducts}</h3>
                <p>Total Productos</p>
              </div>
            </div>
          </Card>

          <Card variant="success" className="stat-card">
            <div className="stat-content">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>{stats.totalUsers}</h3>
                <p>Total Usuarios</p>
              </div>
            </div>
          </Card>

          <Card variant="warning" className="stat-card">
            <div className="stat-content">
              <div className="stat-icon">💵</div>
              <div className="stat-info">
                <h3>${stats.totalSales.toLocaleString()}</h3>
                <p>Ventas Totales</p>
              </div>
            </div>
          </Card>

          <Card variant="danger" className="stat-card">
            <div className="stat-content">
              <div className="stat-icon">⏰</div>
              <div className="stat-info">
                <h3>{stats.pendingOrders}</h3>
                <p>Órdenes Pendientes</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Resumen
          </button>
          <button 
            className={`tab-button ${activeTab === 'usuarios' ? 'active' : ''}`}
            onClick={() => setActiveTab('usuarios')}
          >
            Usuarios
          </button>
          <button 
            className={`tab-button ${activeTab === 'productos' ? 'active' : ''}`}
            onClick={() => setActiveTab('productos')}
          >
            Productos
          </button>
        </div>

        <div className="dashboard-content-wrapper">
          <div className="dashboard-content">
            {activeTab === 'overview' && (
              <div className="dashboard-main">
                <Card title="Productos Recientes" className="recent-products-card">
                  <div className="recent-products-list">
                    {recentProducts.length === 0 ? (
                      <p>No hay productos recientes</p>
                    ) : (
                      recentProducts.map(product => (
                        <div key={product.id} className="product-item">
                          <div className="product-info">
                            <h4>{product.nombre}</h4>
                            <p>{product.descripcion}</p>
                            <span className="product-price">${product.precio?.toFixed(2) || '0.00'}</span>
                          </div>
                          <div className="product-actions">
                            <Button 
                              variant="danger" 
                              size="small"
                              onClick={() => handleEliminarProducto(product.id)}
                            >
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Card>

                <Card title="Actividad Reciente" className="activity-card">
                  <div className="activity-list">
                    {recentActivity.map(activity => (
                      <div key={activity.id} className="activity-item">
                        <div className="activity-icon">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="activity-details">
                          <p className="activity-description">{activity.description}</p>
                          <span className="activity-time">{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'usuarios' && (
              <div className="usuarios-section">
                <div className="section-header">
                  <h3>Lista de Usuarios</h3>
                  <Button 
                    variant="primary" 
                    size="small"
                    onClick={() => navigate('/register')}
                  >
                    Nuevo Usuario
                  </Button>
                </div>
                
                <div className="data-table">
                  {usuarios.length === 0 ? (
                    <p className="no-data">No hay usuarios registrados</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Email</th>
                          <th>Fecha Creación</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usuarios.map(usuario => (
                          <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>{new Date(usuario.fechaCreacion).toLocaleDateString()}</td>
                            <td>
                              <Button 
                                variant="danger" 
                                size="small"
                                onClick={() => handleEliminarUsuario(usuario.id)}
                              >
                                Eliminar
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'productos' && (
              <div className="productos-section">
                <div className="section-header">
                  <h3>Lista de Productos</h3>
                  <Button 
                    variant="primary" 
                    size="small"
                    onClick={() => navigate('/product-register')}
                  >
                    Nuevo Producto
                  </Button>
                </div>
                
                <div className="data-table">
                  {productos.length === 0 ? (
                    <p className="no-data">No hay productos registrados</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Descripción</th>
                          <th>Precio</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productos.map(producto => (
                          <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>${producto.precio?.toFixed(2) || '0.00'}</td>
                            <td>
                              <Button 
                                variant="danger" 
                                size="small"
                                onClick={() => handleEliminarProducto(producto.id)}
                              >
                                Eliminar
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="dashboard-sidebar">
            <Card title="Acciones Rápidas" className="quick-actions-card">
              <div className="quick-actions">
                <Button 
                  variant="primary" 
                  className="quick-action-btn"
                  onClick={() => navigate('/product-register')}
                >
                  ➕ Nuevo Producto
                </Button>
                <Button 
                  variant="secondary" 
                  className="quick-action-btn"
                  onClick={() => navigate('/register')}
                >
                  👤 Nuevo Usuario
                </Button>
                <Button 
                  variant="secondary" 
                  className="quick-action-btn"
                  onClick={() => navigate('/profile')}
                >
                  👤 Mi Perfil
                </Button>
                <Button 
                  variant="secondary" 
                  className="quick-action-btn"
                  onClick={() => navigate('/reports')}
                >
                  📊 Ver Reportes
                </Button>
                <Button 
                  variant="outline" 
                  className="quick-action-btn"
                  onClick={() => navigate('/settings')}
                >
                  ⚙️ Configuración
                </Button>
                <Button 
                  variant="outline" 
                  className="quick-action-btn"
                  onClick={() => navigate('/notifications')}
                >
                  📧 Enviar Notificación
                </Button>
              </div>
            </Card>

            <Card title="Sistema" className="system-card">
              <div className="system-info">
                <div className="system-item">
                  <span>Estado</span>
                  <span className="status-online">En línea</span>
                </div>
                <div className="system-item">
                  <span>Última actualización</span>
                  <span>Hace 2 horas</span>
                </div>
                <div className="system-item">
                  <span>Versión</span>
                  <span>v2.1.0</span>
                </div>
              </div>
            </Card>

            <Button 
              variant="danger" 
              className="logout-btn"
              onClick={handleLogout}
            >
              🚪 Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
