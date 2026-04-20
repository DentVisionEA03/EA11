import React, { useState, useEffect } from 'react';
import { Card, Button, Loading, HomeButton } from '../components';
import { useNavigate } from 'react-router-dom';
import './Notifications.css';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    type: 'info',
    recipients: 'all'
  });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockNotifications = [
          {
            id: 1,
            title: 'Bienvenido al Sistema',
            message: 'Gracias por unirte a nuestra plataforma de gestión',
            type: 'info',
            date: '2024-04-18 10:00',
            status: 'sent',
            recipients: 'all'
          },
          {
            id: 2,
            title: 'Actualización de Productos',
            message: 'Se han agregado nuevos productos al inventario',
            type: 'success',
            date: '2024-04-17 15:30',
            status: 'sent',
            recipients: 'admins'
          },
          {
            id: 3,
            title: 'Mantenimiento Programado',
            message: 'El sistema estará en mantenimiento mañana',
            type: 'warning',
            date: '2024-04-16 09:00',
            status: 'sent',
            recipients: 'all'
          }
        ];
        
        setNotifications(mockNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleInputChange = (field, value) => {
    setNotificationForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendNotification = async () => {
    if (!notificationForm.title || !notificationForm.message) {
      alert('Por favor completa el título y el mensaje');
      return;
    }

    setIsSending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newNotification = {
        id: notifications.length + 1,
        ...notificationForm,
        date: new Date().toLocaleString(),
        status: 'sent'
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      setNotificationForm({
        title: '',
        message: '',
        type: 'info',
        recipients: 'all'
      });
      
      alert('Notificación enviada exitosamente');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Error al enviar notificación');
    } finally {
      setIsSending(false);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return '📢';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'info':
        return '#3b82f6';
      case 'success':
        return '#22c55e';
      case 'warning':
        return '#f59e0b';
      case 'error':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  if (isLoading) {
    return (
      <div className="notifications-page">
        <div className="notifications-loading">
          <Loading text="Cargando notificaciones..." />
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div className="notifications-header-content">
          <div>
            <h1>Enviar Notificación</h1>
            <p>Envía notificaciones a los usuarios del sistema</p>
          </div>
          <HomeButton variant="secondary" size="medium" />
        </div>
      </div>

      <div className="notifications-content">
        <div className="notifications-main">
          <Card title="Nueva Notificación" className="notification-form-card">
            <div className="notification-form">
              <div className="form-group">
                <label>Título:</label>
                <input 
                  type="text"
                  value={notificationForm.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Título de la notificación"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Mensaje:</label>
                <textarea 
                  value={notificationForm.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Escribe tu mensaje aquí..."
                  className="form-textarea"
                  rows="4"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tipo:</label>
                  <select 
                    value={notificationForm.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="form-select"
                  >
                    <option value="info">Información</option>
                    <option value="success">Éxito</option>
                    <option value="warning">Advertencia</option>
                    <option value="error">Error</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Destinatarios:</label>
                  <select 
                    value={notificationForm.recipients}
                    onChange={(e) => handleInputChange('recipients', e.target.value)}
                    className="form-select"
                  >
                    <option value="all">Todos los usuarios</option>
                    <option value="admins">Administradores</option>
                    <option value="users">Usuarios regulares</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <Button 
                  variant="primary"
                  onClick={handleSendNotification}
                  disabled={isSending}
                  size="large"
                >
                  {isSending ? 'Enviando...' : '📧 Enviar Notificación'}
                </Button>
              </div>
            </div>
          </Card>

          <Card title="Notificaciones Enviadas" className="sent-notifications-card">
            <div className="notifications-list">
              {notifications.length === 0 ? (
                <p className="no-notifications">No hay notificaciones enviadas</p>
              ) : (
                notifications.map(notification => (
                  <div key={notification.id} className="notification-item">
                    <div className="notification-icon" style={{ color: getTypeColor(notification.type) }}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="notification-content">
                      <h4>{notification.title}</h4>
                      <p>{notification.message}</p>
                      <div className="notification-meta">
                        <span className="notification-date">{notification.date}</span>
                        <span className="notification-recipients">
                          {notification.recipients === 'all' ? 'Todos' : 
                           notification.recipients === 'admins' ? 'Admins' : 'Usuarios'}
                        </span>
                      </div>
                    </div>
                    <div className="notification-actions">
                      <Button 
                        variant="outline" 
                        size="small"
                        onClick={() => alert(`Reenviando: ${notification.title}`)}
                      >
                        🔄 Reenviar
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <div className="notifications-sidebar">
          <Card title="Estadísticas" className="stats-card">
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-label">Total Enviadas</span>
                <span className="stat-value">{notifications.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Info</span>
                <span className="stat-value">
                  {notifications.filter(n => n.type === 'info').length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Éxito</span>
                <span className="stat-value">
                  {notifications.filter(n => n.type === 'success').length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Advertencias</span>
                <span className="stat-value">
                  {notifications.filter(n => n.type === 'warning').length}
                </span>
              </div>
            </div>
          </Card>

          <Card title="Acciones Rápidas" className="quick-actions-card">
            <div className="quick-actions">
              <Button 
                variant="primary" 
                className="quick-action-btn"
                onClick={() => navigate('/dashboard')}
              >
                🏠 Dashboard
              </Button>
              <Button 
                variant="secondary" 
                className="quick-action-btn"
                onClick={() => navigate('/reports')}
              >
                📊 Ver Reportes
              </Button>
              <Button variant="outline" className="quick-action-btn">
                📋 Plantillas
              </Button>
              <Button variant="outline" className="quick-action-btn">
                ⚙️ Configurar
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
