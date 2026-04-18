import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Estado inicial
const initialState = {
  theme: 'light',
  language: 'es',
  notifications: {
    email: true,
    push: false,
    sms: true
  },
  sidebarOpen: true,
  loading: false,
  error: null
};

// Acciones
const appActions = {
  SET_THEME: 'SET_THEME',
  SET_LANGUAGE: 'SET_LANGUAGE',
  UPDATE_NOTIFICATIONS: 'UPDATE_NOTIFICATIONS',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case appActions.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    
    case appActions.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    
    case appActions.UPDATE_NOTIFICATIONS:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          ...action.payload
        }
      };
    
    case appActions.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      };
    
    case appActions.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case appActions.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    
    case appActions.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Cargar preferencias guardadas
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');
    const savedNotifications = localStorage.getItem('notifications');
    
    if (savedTheme) {
      dispatch({ type: appActions.SET_THEME, payload: savedTheme });
    }
    
    if (savedLanguage) {
      dispatch({ type: appActions.SET_LANGUAGE, payload: savedLanguage });
    }
    
    if (savedNotifications) {
      try {
        const notifications = JSON.parse(savedNotifications);
        dispatch({ type: appActions.UPDATE_NOTIFICATIONS, payload: notifications });
      } catch (error) {
        console.error('Error parsing notifications:', error);
      }
    }
  }, []);

  // Guardar preferencias cuando cambian
  useEffect(() => {
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem('language', state.language);
  }, [state.language]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(state.notifications));
  }, [state.notifications]);

  // Aplicar tema al documento
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  // Acciones
  const setTheme = (theme) => {
    dispatch({ type: appActions.SET_THEME, payload: theme });
  };

  const setLanguage = (language) => {
    dispatch({ type: appActions.SET_LANGUAGE, payload: language });
  };

  const updateNotifications = (notifications) => {
    dispatch({ type: appActions.UPDATE_NOTIFICATIONS, payload: notifications });
  };

  const toggleSidebar = () => {
    dispatch({ type: appActions.TOGGLE_SIDEBAR });
  };

  const setLoading = (loading) => {
    dispatch({ type: appActions.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: appActions.SET_ERROR, payload: error });
  };

  const clearError = () => {
    dispatch({ type: appActions.CLEAR_ERROR });
  };

  const value = {
    ...state,
    setTheme,
    setLanguage,
    updateNotifications,
    toggleSidebar,
    setLoading,
    setError,
    clearError
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de un AppProvider');
  }
  return context;
};

export default AppContext;
