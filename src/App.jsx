import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Truck, 
  Package, 
  Activity,
  Droplet,
  Search,
  MapPin,
  Phone
} from 'lucide-react';

// Mock Data
const initialEmployees = [
  { id: 1, name: 'Carlos Mendoza', route: 'R-Norte', status: 'active', garrafonesDelivered: 45, target: 100 },
  { id: 2, name: 'Luis García', route: 'R-Sur', status: 'active', garrafonesDelivered: 82, target: 120 },
  { id: 3, name: 'Miguel Ángel', route: 'R-Este', status: 'idle', garrafonesDelivered: 30, target: 80 },
  { id: 4, name: 'Roberto Díaz', route: 'R-Oeste', status: 'offline', garrafonesDelivered: 15, target: 90 },
];

const mockCustomers = [
  { id: 'CUST-001', name: 'Tienda La Esperanza', address: 'Av. Vallarta 1200', phone: '33 1234 5678', lastDelivery: 'Hace 2 horas', status: 'Surtido' },
  { id: 'CUST-002', name: 'Abarrotes Don Pepe', address: 'Calle Independencia 45', phone: '33 8765 4321', lastDelivery: 'Ayer', status: 'Pendiente' },
  { id: 'CUST-003', name: 'Mini Super Express', address: 'Blvrd. Marcelino 90', phone: '33 5555 4444', lastDelivery: 'Hace 5 horas', status: 'Surtido' },
  { id: 'CUST-004', name: 'Farmacia Centro', address: 'Plaza Principal Local 4', phone: '33 9999 1111', lastDelivery: 'Hace 2 días', status: 'Requiere Visita' },
  { id: 'CUST-005', name: 'Papelería El Estudiante', address: 'Av. México 450', phone: '33 2222 3333', lastDelivery: 'Ayer', status: 'Pendiente' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real-time Dashboard Simulation using useEffect
  useEffect(() => {
    if (activeTab !== 'monitoring') return;
    
    // Simulate real-time updates for water jug deliveries
    const interval = setInterval(() => {
      setEmployees(current => 
        current.map(emp => {
          if (emp.status === 'active' && Math.random() > 0.5) {
             const added = Math.floor(Math.random() * 3);
             return { ...emp, garrafonesDelivered: Math.min(emp.garrafonesDelivered + added, emp.target) };
          }
          return emp;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [activeTab]);

  const totalDelivered = employees.reduce((acc, emp) => acc + emp.garrafonesDelivered, 0);
  const activeTrucks = employees.filter(emp => emp.status === 'active').length;

  const filteredCustomers = mockCustomers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="app-container">
      {/* Sidebar Menu */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Droplet size={24} />
          </div>
          <div className="brand-text">
            <h1>AGUA BISSU</h1>
            <p>Admin Panel</p>
          </div>
        </div>

        <nav className="nav-links">
          <button 
            className={`nav-item ${activeTab === 'monitoring' ? 'active' : ''}`}
            onClick={() => setActiveTab('monitoring')}
          >
            <LayoutDashboard size={20} />
            Monitoreo en Tiempo Real
          </button>
          <button 
            className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            <Users size={20} />
            Gestión de Clientes
          </button>
        </nav>
      </aside>

      {/* Main Single Page Content */}
      <main className="main-content">
        {activeTab === 'monitoring' && (
          <div className="fade-in-section">
            <div className="header-title">
              <h2>Panel de Control y Contabilización</h2>
              <p>Monitoreo en tiempo real de empleados y transporte de garrafones.</p>
            </div>

            {/* KPIs */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon success">
                  <Package size={28} />
                </div>
                <div className="stat-info">
                  <h3>Garrafones Entregados Hoy</h3>
                  <p>{totalDelivered}</p>
                  <div className="real-time-badge">
                    <div className="pulse"></div> Actualizando
                  </div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <Truck size={28} />
                </div>
                <div className="stat-info">
                  <h3>Unidades en Ruta</h3>
                  <p>{activeTrucks} / {employees.length}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon warning">
                  <Activity size={28} />
                </div>
                <div className="stat-info">
                  <h3>Eficiencia Global</h3>
                  <p>78%</p>
                </div>
              </div>
            </div>

            {/* Real-time Employees List */}
            <div className="glass-panel">
              <div className="panel-header">
                <h3>Estado de Rutas - Empleados</h3>
              </div>
              <div className="employees-list">
                {employees.map(emp => {
                  const progressPercentage = (emp.garrafonesDelivered / emp.target) * 100;
                  return (
                    <div className="employee-item" key={emp.id}>
                      <div className="employee-profile">
                        <div className="avatar">{emp.name.charAt(0)}</div>
                        <div className="employee-info">
                          <h4>{emp.name}</h4>
                          <p>{emp.route} • {emp.garrafonesDelivered} / {emp.target} Garrafones</p>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                          </div>
                        </div>
                      </div>
                      <div className={`status-badge ${emp.status}`}>
                        {emp.status === 'active' ? 'En Ruta' : emp.status === 'idle' ? 'Descanso' : 'Desconectado'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Customer Management Module SPA */}
        {activeTab === 'customers' && (
          <div className="fade-in-section">
            <div className="header-title">
              <h2>Módulo de Gestión de Clientes</h2>
              <p>Seguimiento integral de clientes y recepción de servicio.</p>
            </div>

            <div className="search-bar">
              <Search size={20} color="#94a3b8" />
              <input 
                type="text" 
                placeholder="Buscar cliente por nombre..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="customer-grid">
              {filteredCustomers.map(customer => (
                <div className="customer-card" key={customer.id}>
                  <div className="customer-header">
                    <div>
                      <h3 className="customer-name">{customer.name}</h3>
                      <span className="customer-id">{customer.id}</span>
                    </div>
                    <div className={`status-badge ${customer.status === 'Surtido' ? 'active' : 'idle'}`}>
                      {customer.status}
                    </div>
                  </div>
                  
                  <div className="customer-details">
                    <div className="detail-row">
                      <MapPin size={16} />
                      <span>{customer.address}</span>
                    </div>
                    <div className="detail-row">
                      <Phone size={16} />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="detail-row">
                      <Truck size={16} />
                      <span>Último servicio: {customer.lastDelivery}</span>
                    </div>
                  </div>

                  <button className="action-button">
                    Ver Expediente
                  </button>
                </div>
              ))}
              
              {filteredCustomers.length === 0 && (
                <p style={{color: 'var(--text-secondary)'}}>No se encontraron clientes.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
