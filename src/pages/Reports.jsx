import React, { useState, useEffect } from 'react';
import { Card, Button, Loading, HomeButton } from '../components';
import { useNavigate } from 'react-router-dom';
import './Reports.css';

const Reports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockReports = [
          {
            id: 1,
            name: 'Reporte de Ventas',
            type: 'sales',
            date: '2024-04-18',
            status: 'completed',
            description: 'Reporte mensual de ventas totales'
          },
          {
            id: 2,
            name: 'Reporte de Usuarios',
            type: 'users',
            date: '2024-04-17',
            status: 'completed',
            description: 'Reporte semanal de nuevos usuarios'
          },
          {
            id: 3,
            name: 'Reporte de Productos',
            type: 'products',
            date: '2024-04-16',
            status: 'processing',
            description: 'Reporte de inventario actual'
          }
        ];
        
        setReports(mockReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleGenerateReport = async (type) => {
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`Reporte de ${type} generado exitosamente`);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error al generar reporte');
    }
  };

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getReportIcon = (type) => {
    switch (type) {
      case 'sales':
        return '💰';
      case 'users':
        return '👥';
      case 'products':
        return '📦';
      default:
        return '📊';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#22c55e';
      case 'processing':
        return '#f59e0b';
      case 'failed':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  if (isLoading) {
    return (
      <div className="reports-page">
        <div className="reports-loading">
          <Loading text="Cargando reportes..." />
        </div>
      </div>
    );
  }

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div className="reports-header-content">
          <div>
            <h1>Reportes</h1>
            <p>Genera y visualiza reportes del sistema</p>
          </div>
          <HomeButton variant="secondary" size="medium" />
        </div>
      </div>

      <div className="reports-content">
        <div className="reports-main">
          <Card title="Generar Nuevo Reporte" className="generate-report-card">
            <div className="report-form">
              <div className="form-row">
                <label>Tipo de Reporte:</label>
                <select 
                  value={selectedReport || ''}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="report-select"
                >
                  <option value="">Seleccionar tipo...</option>
                  <option value="sales">Ventas</option>
                  <option value="users">Usuarios</option>
                  <option value="products">Productos</option>
                  <option value="activity">Actividad</option>
                </select>
              </div>
              
              <div className="form-row">
                <label>Fecha Inicio:</label>
                <input 
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => handleDateChange('startDate', e.target.value)}
                  className="date-input"
                />
              </div>
              
              <div className="form-row">
                <label>Fecha Fin:</label>
                <input 
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => handleDateChange('endDate', e.target.value)}
                  className="date-input"
                />
              </div>
              
              <div className="form-actions">
                <Button 
                  variant="primary"
                  onClick={() => handleGenerateReport(selectedReport)}
                  disabled={!selectedReport}
                  size="large"
                >
                  📊 Generar Reporte
                </Button>
              </div>
            </div>
          </Card>

          <Card title="Reportes Recientes" className="recent-reports-card">
            <div className="reports-list">
              {reports.length === 0 ? (
                <p className="no-reports">No hay reportes generados</p>
              ) : (
                reports.map(report => (
                  <div key={report.id} className="report-item">
                    <div className="report-icon">
                      {getReportIcon(report.type)}
                    </div>
                    <div className="report-info">
                      <h4>{report.name}</h4>
                      <p>{report.description}</p>
                      <div className="report-meta">
                        <span className="report-date">{report.date}</span>
                        <span 
                          className="report-status"
                          style={{ color: getStatusColor(report.status) }}
                        >
                          {report.status === 'completed' ? 'Completado' : 
                           report.status === 'processing' ? 'Procesando' : 'Fallido'}
                        </span>
                      </div>
                    </div>
                    <div className="report-actions">
                      <Button 
                        variant="outline" 
                        size="small"
                        onClick={() => alert(`Descargando ${report.name}...`)}
                      >
                        📥 Descargar
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <div className="reports-sidebar">
          <Card title="Estadísticas Rápidas" className="stats-card">
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-label">Total Reportes</span>
                <span className="stat-value">{reports.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Completados</span>
                <span className="stat-value">
                  {reports.filter(r => r.status === 'completed').length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Procesando</span>
                <span className="stat-value">
                  {reports.filter(r => r.status === 'processing').length}
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
                onClick={() => navigate('/settings')}
              >
                ⚙️ Configuración
              </Button>
              <Button variant="outline" className="quick-action-btn">
                📧 Enviar por Email
              </Button>
              <Button variant="outline" className="quick-action-btn">
                📋 Programar Reporte
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
