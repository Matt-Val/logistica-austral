# Logistica Austral - Front

Aplicación web desarrollada en **React + Vite** para la gestión, arriendo y cotización de flotas de camiones y maquinaria pesada. El sistema permite a los clientes explorar el catálogo, filtrar por tipos de maquinaria y solicitar cotizaciones formales, mientras que los administradores pueden gestionar la disponibilidad de la flota.


## Características

### Para Clientes
* **Exploración de Flota:** Catálogo visual de camiones (Tolva, Tracto, Rígido, Ramplas) con filtros de búsqueda.
* **Carrito de Cotización:** Permite agregar múltiples equipos, definir fechas de inicio/fin y calcular meses estimados.
* **Solicitud de Cotizacion:** Formulario valido para enviar solicitudes de arriendo al equipo de ventas.
* **Autenticación:** Registro e inicio de sesión de usuarios.

### Para Administradores
* **Panel de Gestión:** Vista exclusiva para usuarios con rol de administrador.
* **Control de Disponibilidad:** Interruptores para marcar camiones como "Disponibles" o "No Disponibles" en tiempo real.
* **Gestión de Usuarios:** Funcionalidad para crear usuarios administradores.

## Tecnologías Utilizadas
* **Core:** [React 19], [Vite]
* **Estilos:** [Bootstrap 5](https://getbootstrap.com/)
* **Peticiones HTTP:** Axios (Conexión a API REST externa).
* **Testing:** Vitest, React Testing Library, JSDOM.

## Pre-requisitos
* Node.js (Versión 18 o superior).
* NPM.
* Conexión a Internet (Conexión con API Backend alojada en AWS).

## Instalación y Ejecución
* **Instalar Dependencias:** npm install
* **Ejecutar en desarrollo:** npm run dev
* La aplicación estará disponible generalmente en `http://localhost:5173`.

## Estructura del Proyecto

```text
src/
├── assets/          # Imágenes, logos e iconos
├── components/
│   ├── layout/      # Header, Footer, Navbar
│   └── ui/          # Cards de camiones, Carrito, Popups, Carrusel
├── context/         # Contextos globales (Auth y Carrito)
├── css/             # Hojas de estilo por módulo
├── data/            # Datos estáticos (fallback de camiones)
├── pages/           # Vistas principales (Inicio, Login, Explorar, Admin...)
├── services/        # Lógica de conexión con la API (Axios)
├── main.jsx         # Punto de entrada de React
└── App.jsx          # Configuración de rutas
test/                # Pruebas unitarias e integración (Vitest)

