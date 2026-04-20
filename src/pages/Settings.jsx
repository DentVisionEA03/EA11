import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Loading, Modal } from '../components';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: true,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      allowMessages: true
    },
    security: {
      twoFactor: false,
      sessionTimeout: '30',
      loginAlerts: true
    },
    preferences: {
      language: 'es',
      timezone: 'America/Mexico_City',
      theme: 'light',
      dateFormat: 'DD/MM/YYYY'
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Load settings from localStorage or use defaults
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings(prev => ({
            ...prev,
            ...parsedSettings
          }));
          
          // Apply theme on load
          if (parsedSettings.preferences?.theme) {
            document.body.setAttribute('data-theme', parsedSettings.preferences.theme);
          }
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const handleSecurityChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value
      }
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem('userSettings', JSON.stringify(settings));
      
      // Apply theme if changed
      if (settings.preferences.theme) {
        document.body.setAttribute('data-theme', settings.preferences.theme);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Settings saved:', settings);
      alert('Configuración guardada exitosamente');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error al guardar la configuración');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'La contraseña actual es requerida';
    }
    
    if (!passwordForm.newPassword) {
      errors.newPassword = 'La nueva contraseña es requerida';
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = 'La contraseña debe tener al menos 8 caracteres';
    }
    
    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = 'Confirma la nueva contraseña';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    return errors;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const errors = validatePasswordForm();
    
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Password changed');
      setShowPasswordModal(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="settings-page">
        <div className="settings-loading">
          <Loading type="spinner" size="large" text="Cargando configuración..." />
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Configuración</h1>
        <p>Administra tu cuenta y preferencias</p>
      </div>

      <div className="settings-content">
        <div className="settings-main">
          <Card title="Notificaciones" className="settings-card">
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Email</label>
                  <span className="setting-description">Recibir notificaciones por email</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Push</label>
                  <span className="setting-description">Notificaciones push en el navegador</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={() => handleNotificationChange('push')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">SMS</label>
                  <span className="setting-description">Recibir notificaciones por SMS</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications.sms}
                    onChange={() => handleNotificationChange('sms')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Marketing</label>
                  <span className="setting-description">Emails de marketing y promociones</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications.marketing}
                    onChange={() => handleNotificationChange('marketing')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </Card>

          <Card title="Privacidad" className="settings-card">
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Visibilidad del perfil</label>
                  <span className="setting-description">Quién puede ver tu perfil</span>
                </div>
                <select
                  value={settings.privacy.profileVisibility}
                  onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                  className="setting-select"
                >
                  <option value="public">Público</option>
                  <option value="friends">Amigos</option>
                  <option value="private">Privado</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Mostrar email</label>
                  <span className="setting-description">Permitir que otros vean tu email</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.privacy.showEmail}
                    onChange={() => handlePrivacyChange('showEmail', !settings.privacy.showEmail)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Mostrar teléfono</label>
                  <span className="setting-description">Permitir que otros vean tu teléfono</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.privacy.showPhone}
                    onChange={() => handlePrivacyChange('showPhone', !settings.privacy.showPhone)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </Card>

          <Card title="Seguridad" className="settings-card">
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Autenticación de dos factores</label>
                  <span className="setting-description">Añade una capa extra de seguridad</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactor}
                    onChange={() => handleSecurityChange('twoFactor', !settings.security.twoFactor)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Tiempo de sesión</label>
                  <span className="setting-description">Tiempo antes de cerrar sesión automáticamente</span>
                </div>
                <select
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                  className="setting-select"
                >
                  <option value="15">15 minutos</option>
                  <option value="30">30 minutos</option>
                  <option value="60">1 hora</option>
                  <option value="120">2 horas</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Alertas de inicio de sesión</label>
                  <span className="setting-description">Recibir alertas cuando inicies sesión</span>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.security.loginAlerts}
                    onChange={() => handleSecurityChange('loginAlerts', !settings.security.loginAlerts)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="security-actions">
              <Button 
                variant="outline" 
                onClick={() => setShowPasswordModal(true)}
              >
                🔐 Cambiar Contraseña
              </Button>
            </div>
          </Card>

          <Card title="Preferencias" className="settings-card">
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Idioma</label>
                  <span className="setting-description">Idioma de la interfaz</span>
                </div>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="setting-select"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="pt">Português</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Zona horaria</label>
                  <span className="setting-description">Tu zona horaria local</span>
                </div>
                <select
                  value={settings.preferences.timezone}
                  onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                  className="setting-select"
                >
                  <option value="America/Mexico_City">Ciudad de México</option>
                  <option value="America/New_York">Nueva York</option>
                  <option value="Europe/Madrid">Madrid</option>
                  <option value="Asia/Tokyo">Tokio</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Tema</label>
                  <span className="setting-description">Apariencia de la interfaz</span>
                </div>
                <select
                  value={settings.preferences.theme}
                  onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                  className="setting-select"
                >
                  <option value="light">Claro</option>
                  <option value="dark">Oscuro</option>
                  <option value="auto">Automático</option>
                </select>
              </div>
            </div>
          </Card>

          <div className="settings-actions">
            <Button 
              variant="primary" 
              onClick={handleSave}
              disabled={isSaving}
              size="large"
            >
              {isSaving ? <Loading text="Guardando..." /> : '💾 Guardar Cambios'}
            </Button>
          </div>
        </div>

        <div className="settings-sidebar">
          <Card title="Información de Cuenta" className="account-info-card">
            <div className="account-info">
              <div className="info-item">
                <span className="info-label">Tipo de cuenta</span>
                <span className="info-value">Premium</span>
              </div>
              <div className="info-item">
                <span className="info-label">Espacio usado</span>
                <span className="info-value">2.4 GB / 10 GB</span>
              </div>
              <div className="info-item">
                <span className="info-label">Miembro desde</span>
                <span className="info-value">Enero 2024</span>
              </div>
            </div>
          </Card>

          <Card title="Acciones Rápidas" className="quick-actions-card">
            <div className="quick-actions">
              <Button variant="outline" className="quick-action-btn">
                📥 Exportar datos
              </Button>
              <Button variant="outline" className="quick-action-btn">
                📋 Ver registro de actividad
              </Button>
              <Button variant="outline" className="quick-action-btn">
                🔔 Configurar alertas
              </Button>
              <Button variant="danger" className="quick-action-btn">
                🗑️ Eliminar cuenta
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Cambiar Contraseña"
        size="small"
      >
        <form onSubmit={handlePasswordSubmit} className="password-form">
          <Input
            type="password"
            label="Contraseña Actual"
            name="currentPassword"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.currentPassword}
            required
          />
          
          <Input
            type="password"
            label="Nueva Contraseña"
            name="newPassword"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.newPassword}
            required
          />
          
          <Input
            type="password"
            label="Confirmar Nueva Contraseña"
            name="confirmPassword"
            value={passwordForm.confirmPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.confirmPassword}
            required
          />
          
          <div className="modal-actions">
            <Button variant="outline" onClick={() => setShowPasswordModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Cambiar Contraseña
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Settings;
