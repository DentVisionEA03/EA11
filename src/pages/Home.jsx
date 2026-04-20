import React from 'react';
import { Button, Card } from '../components';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '📦',
      title: 'Gestión de Productos',
      description: 'Administra tu inventario de forma sencilla y eficiente'
    },
    {
      icon: '📊',
      title: 'Reportes en Tiempo Real',
      description: 'Obtén insights valiosos sobre tus ventas y productos'
    },
    {
      icon: '🔒',
      title: 'Seguridad Garantizada',
      description: 'Tus datos están protegidos con la mejor tecnología'
    },
    {
      icon: '🚀',
      title: 'Rápido y Eficiente',
      description: 'Interfaz optimizada para máxima productividad'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Productos Gestiónados' },
    { number: '500+', label: 'Usuarios Activos' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Soporte' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Gestiona tu Inventario de Forma Inteligente</h1>
            <p>
              La plataforma más completa para el control de productos, 
              ventas y gestión empresarial. Todo lo que necesitas en un solo lugar.
            </p>
            <div className="hero-buttons">
              <Button 
                variant="primary" 
                size="large"
                onClick={() => navigate('/register')}
              >
                Comenzar Gratis
              </Button>
              <Button 
                variant="outline" 
                size="large"
                onClick={() => navigate('/login')}
              >
                Iniciar Sesión
              </Button>
            </div>
          </div>
          <div className="hero-image">
            <img src="/src/assets/hero.png" alt="Gestión de Productos" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Características Principales</h2>
            <p>Todo lo que necesitas para gestionar tu negocio</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <Card className="cta-card">
            <h2>¿Listo para Transformar tu Negocio?</h2>
            <p>
              Únete a miles de empresas que ya están optimizando 
              su gestión con nuestra plataforma.
            </p>
            <Button 
              variant="primary" 
              size="large"
              onClick={() => navigate('/register')}
            >
              Regístrate Ahora
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Producto Manager</h3>
              <p>La mejor solución para gestión de inventario</p>
            </div>
            <div className="footer-section">
              <h4>Enlaces Rápidos</h4>
              <ul>
                <li><a href="#" onClick={() => navigate('/login')}>Iniciar Sesión</a></li>
                <li><a href="#" onClick={() => navigate('/register')}>Registrarse</a></li>
                <li><a href="#">Características</a></li>
                <li><a href="#">Precios</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Soporte</h4>
              <ul>
                <li><a href="#">Ayuda</a></li>
                <li><a href="#">Contacto</a></li>
                <li><a href="#">Términos</a></li>
                <li><a href="#">Privacidad</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Producto Manager. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
