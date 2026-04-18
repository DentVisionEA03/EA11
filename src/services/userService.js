import apiService from './apiService';

// Servicio de usuarios
class UserService {
  // Obtener perfil del usuario actual
  async getProfile() {
    return await apiService.get('/user/profile');
  }

  // Actualizar perfil del usuario
  async updateProfile(userData) {
    return await apiService.put('/user/profile', userData);
  }

  // Cambiar avatar
  async updateAvatar(formData) {
    return await apiService.upload('/user/avatar', formData);
  }

  // Cambiar contraseña
  async changePassword(passwordData) {
    return await apiService.post('/user/change-password', passwordData);
  }

  // Obtener configuración del usuario
  async getSettings() {
    return await apiService.get('/user/settings');
  }

  // Actualizar configuración del usuario
  async updateSettings(settings) {
    return await apiService.put('/user/settings', settings);
  }

  // Eliminar cuenta del usuario
  async deleteAccount(password) {
    return await apiService.post('/user/delete-account', { password });
  }

  // Obtener actividad reciente
  async getRecentActivity(limit = 10) {
    return await apiService.get('/user/activity', { limit });
  }

  // Obtener estadísticas del usuario
  async getStats() {
    return await apiService.get('/user/stats');
  }

  // Exportar datos del usuario
  async exportData() {
    return await apiService.download('/user/export', 'user-data.json');
  }

  // Verificar si el email está disponible
  async checkEmailAvailability(email) {
    return await apiService.post('/user/check-email', { email });
  }

  // Verificar si el username está disponible
  async checkUsernameAvailability(username) {
    return await apiService.post('/user/check-username', { username });
  }

  // Obtener notificaciones del usuario
  async getNotifications(page = 1, limit = 20) {
    return await apiService.get('/user/notifications', { page, limit });
  }

  // Marcar notificación como leída
  async markNotificationAsRead(notificationId) {
    return await apiService.patch(`/user/notifications/${notificationId}/read`);
  }

  // Marcar todas las notificaciones como leídas
  async markAllNotificationsAsRead() {
    return await apiService.patch('/user/notifications/read-all');
  }

  // Eliminar notificación
  async deleteNotification(notificationId) {
    return await apiService.delete(`/user/notifications/${notificationId}`);
  }

  // Obtener preferencias de notificación
  async getNotificationPreferences() {
    return await apiService.get('/user/notification-preferences');
  }

  // Actualizar preferencias de notificación
  async updateNotificationPreferences(preferences) {
    return await apiService.put('/user/notification-preferences', preferences);
  }
}

export default new UserService();
