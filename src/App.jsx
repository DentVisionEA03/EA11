import React from 'react';
import { AuthProvider, AppProvider } from './context';
import AppRouter from './routes';
import './App.css';

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
