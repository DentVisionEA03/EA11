import React, { useState, useEffect } from 'react';
import { Card, Button, Loading, HomeButton } from '../components';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeUsers: 0,
    totalSales: 0,
    pendingOrders: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setStats({
          totalProducts: 156,
          activeUsers: 1240,
          totalSales: 45678,
          pendingOrders: 23
        });

        setRecentActivity([
          { id: 1, type: 'sale', description: 'Nueva venta #1234', time: 'Hace 5 minutos' },
          { id: 2, type: 'user', description: 'Nuevo usuario registrado', time: 'Hace 15 minutos' },
          { id: 3, type: 'product', description: 'Producto actualizado', time: 'Hace 1 hora' },
          { id: 4, type: 'order', description: 'Pedido #1233 completado', time: 'Hace 2 horas' }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
          <Loading type="spinner" size="large" text="Cargando dashboard..." />
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
            <p>Bienvenido al panel de control</p>
          </div>
          <HomeButton variant="secondary" size="medium" />
        </div>
      </div>

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
              <h3>{stats.activeUsers}</h3>
              <p>Usuarios Activos</p>
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

      <div className="dashboard-content">
        <div className="dashboard-main">
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
            <div className="activity-footer">
              <Button variant="outline" size="small">
                Ver toda la actividad
              </Button>
            </div>
          </Card>
        </div>

        <div className="dashboard-sidebar">
          <Card title="Acciones Rápidas" className="quick-actions-card">
            <div className="quick-actions">
              <Button 
                variant="primary" 
                className="quick-action-btn"
                onClick={() => navigate('/add-product')}
              >
                ➕ Nuevo Producto
              </Button>
              <Button variant="secondary" className="quick-action-btn">
                📊 Ver Reportes
              </Button>
              <Button variant="outline" className="quick-action-btn">
                ⚙️ Configuración
              </Button>
              <Button variant="outline" className="quick-action-btn">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
