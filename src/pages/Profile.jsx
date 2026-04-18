import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Loading, Modal } from '../components';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    avatar: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProfile({
          name: 'Juan Pérez',
          email: 'juan.perez@email.com',
          phone: '+1 234 567 8900',
          bio: 'Desarrollador de software apasionado por crear soluciones innovadoras.',
          avatar: 'https://picsum.photos/seed/user123/150/150.jpg'
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Profile saved:', profile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values (in a real app, you'd store the original values)
  };

  if (isLoading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <Loading type="spinner" size="large" text="Cargando perfil..." />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Mi Perfil</h1>
        <p>Administra tu información personal</p>
      </div>

      <div className="profile-content">
        <div className="profile-main">
          <Card className="profile-card">
            <div className="profile-avatar-section">
              <div className="avatar-container">
                <img 
                  src={profile.avatar} 
                  alt="Profile Avatar" 
                  className="profile-avatar"
                />
                <Button 
                  variant="outline" 
                  size="small"
                  className="avatar-edit-btn"
                  onClick={() => setShowAvatarModal(true)}
                >
                  📷 Cambiar
                </Button>
              </div>
            </div>

            <div className="profile-form">
              <div className="form-row">
                <Input
                  label="Nombre Completo"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="form-row">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="form-row">
                <Input
                  label="Teléfono"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-row">
                <label className="bio-label">Biografía</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bio-textarea"
                  rows={4}
                  placeholder="Cuéntanos sobre ti..."
                />
              </div>

              <div className="profile-actions">
                {!isEditing ? (
                  <Button 
                    variant="primary" 
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️ Editar Perfil
                  </Button>
                ) : (
                  <div className="edit-actions">
                    <Button 
                      variant="primary" 
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? <Loading text="Guardando..." /> : '💾 Guardar Cambios'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                      disabled={isSaving}
                    >
                      ❌ Cancelar
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="profile-sidebar">
          <Card title="Información de Cuenta" className="account-info-card">
            <div className="account-info">
              <div className="info-item">
                <span className="info-label">Miembro desde</span>
                <span className="info-value">Enero 2024</span>
              </div>
              <div className="info-item">
                <span className="info-label">Estado</span>
                <span className="info-value status-active">Activo</span>
              </div>
              <div className="info-item">
                <span className="info-label">Tipo de cuenta</span>
                <span className="info-value">Premium</span>
              </div>
              <div className="info-item">
                <span className="info-label">Último acceso</span>
                <span className="info-value">Hoy, 10:30 AM</span>
              </div>
            </div>
          </Card>

          <Card title="Acciones Rápidas" className="quick-actions-card">
            <div className="quick-actions">
              <Button variant="outline" className="quick-action-btn">
                🔐 Cambiar Contraseña
              </Button>
              <Button variant="outline" className="quick-action-btn">
                📧 Configuración Email
              </Button>
              <Button variant="outline" className="quick-action-btn">
                🔔 Notificaciones
              </Button>
              <Button variant="danger" className="quick-action-btn">
                🗑️ Eliminar Cuenta
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        title="Cambiar Avatar"
        size="small"
      >
        <div className="avatar-modal-content">
          <p>Selecciona una nueva imagen de perfil:</p>
          <div className="avatar-options">
            <Button variant="outline">📁 Subir desde dispositivo</Button>
            <Button variant="outline">🌐 Usar cámara</Button>
            <Button variant="outline">🎨 Elegir avatar predeterminado</Button>
          </div>
          <div className="modal-actions">
            <Button variant="outline" onClick={() => setShowAvatarModal(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
