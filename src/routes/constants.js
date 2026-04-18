// Constantes de rutas
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings'
};

// Nombres de rutas para navegación
export const ROUTE_NAMES = {
  [ROUTES.HOME]: 'Inicio',
  [ROUTES.LOGIN]: 'Iniciar Sesión',
  [ROUTES.REGISTER]: 'Registrarse',
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.PROFILE]: 'Mi Perfil',
  [ROUTES.SETTINGS]: 'Configuración'
};

// Rutas públicas (accesibles sin autenticación)
export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER
];

// Rutas privadas (requieren autenticación)
export const PRIVATE_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PROFILE,
  ROUTES.SETTINGS
];
