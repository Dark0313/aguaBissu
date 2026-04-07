# Documentación Técnica: Proyecto Agua Bissu

Este documento está diseñado para ayudar a los desarrolladores (especialmente perfiles junior) a entender la arquitectura, el flujo de datos y las tecnologías utilizadas en el Panel de Administración de **Agua Bissu**.

## 1. Visión General del Proyecto

Agua Bissu es una aplicación web de tipo **SPA (Single Page Application)** diseñada para monitorear en tiempo real la entrega de garrafones de agua y gestionar la información de los clientes. 

El objetivo principal es dar visibilidad sobre:
- El progreso de las rutas de entrega.
- La eficiencia de los empleados.
- La base de datos de clientes activos.

---

## 2. Stack Tecnológico

- **Frontend**: [React.js](https://reactjs.org/) (Funcional con Hooks).
- **Herramienta de Construcción**: [Vite](https://vitejs.dev/) (Para un desarrollo rápido y builds optimizados).
- **Iconografía**: [Lucide React](https://lucide.dev/) (Librería de iconos ligeros).
- **Estilos**: Vanilla CSS con variables personalizadas (CSS Custom Properties).
- **Tipografía**: Outfit (vía Google Fonts).

---

## 3. Estructura de Archivos

```text
aguaBissu/
├── src/
│   ├── assets/          # Imágenes y recursos estáticos.
│   ├── App.jsx          # Componente principal con la lógica de navegación y estado.
│   ├── App.css          # Estilos específicos del componente App (si se requieren).
│   ├── index.css        # Sistema de diseño central: colores, fuentes y utilidades.
│   └── main.jsx         # Punto de entrada de React.
├── public/              # Archivos que se sirven directamente (ej. favicon).
├── index.html           # Plantilla HTML base.
└── package.json         # Dependencias y scripts del proyecto.
```

---

## 4. Lógica de Negocio y Estado

### 4.1 Simulación en Tiempo Real
Actualmente, el proyecto utiliza datos simulados para demostrar su capacidad. 
En `App.jsx`, se utiliza un hook `useEffect` con un `setInterval` de 3 segundos que actualiza aleatoriamente el número de garrafones entregados por cada empleado con estado `active`.

```javascript
useEffect(() => {
  if (activeTab !== 'monitoring') return;
  
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
```

### 4.2 Navegación (Tabs)
La navegación es gestionada mediante el estado `activeTab`. Dependiendo de si es `'monitoring'` o `'customers'`, se renderiza condicionalmente el contenido en el `main` de la aplicación.

---

## 5. Sistema de Diseño (CSS)

El archivo `src/index.css` define las variables de color en `:root`. Para mantener la consistencia, **siempre usa estas variables** en lugar de colores fijos:

- `--bg-color`: Fondo profundo (dark mode).
- `--surface-color`: Color de tarjetas y paneles.
- `--accent-primary`: Azul principal de la marca.
- `--success`, `--warning`, `--danger`: Colores semánticos para estados.

---

## 6. Guía para la Evolución del Proyecto

Para un desarrollador que desee expandir este proyecto, se sugieren los siguientes pasos:

### Nivel 1: Frontend
1. **Componentización**: Extraer elementos como `StatCard`, `EmployeeItem` o `CustomerCard` a archivos separados en una carpeta `src/components/`.
2. **Formularios**: Agregar un modal o sección para registrar nuevos clientes o empleados.

### Nivel 2: Integración
1. **Consumo de API**: Reemplazar los arrays `initialEmployees` y `mockCustomers` por llamadas a una API real usando `fetch` o `axios`.
2. **Persistencia**: Implementar un sistema de autenticación (Login) para proteger el panel.

### Nivel 3: Backend (Futuro)
1. Conectar con una base de datos (PostgreSQL/MongoDB) para guardar el historial de entregas.
2. Implementar WebSockets (Socket.io) para recibir las actualizaciones de los empleados en tiempo real de verdad.

---

## 7. Comandos Útiles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera la versión de producción en la carpeta `dist/`.
- `npm run preview`: Permite ver localmente la versión generada por el build.

---
> [!TIP]
> **Consejo para Juniors**: Al agregar nuevos iconos, asegúrate de importarlos desde `lucide-react` al inicio de `App.jsx`. Mantén el código limpio separando la lógica de presentación de la lógica de datos.
