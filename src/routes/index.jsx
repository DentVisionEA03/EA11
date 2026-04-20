import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useAuth } from '../context';

// Importar páginas desde la carpeta pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import AddProduct from '../pages/AddProduct';
import Products from '../pages/Products';
import ProductRegister from '../pages/ProductRegister';
import Reports from '../pages/Reports';
import Notifications from '../pages/Notifications';

// Componente de protección de rutas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Componente de rutas públicas (solo para no autenticados)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

// Configuración de rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <div>Something went wrong!</div>
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    )
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    )
  },
  {
    path: '/products',
    element: (
      <ProtectedRoute>
        <Products />
      </ProtectedRoute>
    )
  },
  {
    path: '/add-product',
    element: (
      <ProtectedRoute>
        <AddProduct />
      </ProtectedRoute>
    )
  },
  {
    path: '/product-register',
    element: (
      <ProtectedRoute>
        <ProductRegister />
      </ProtectedRoute>
    )
  },
  {
    path: '/reports',
    element: (
      <ProtectedRoute>
        <Reports />
      </ProtectedRoute>
    )
  },
  {
    path: '/notifications',
    element: (
      <ProtectedRoute>
        <Notifications />
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />
  }
]);

// Componente principal de rutas
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
