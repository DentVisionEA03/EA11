# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

#instalacion 
1.  Requisitos Previos
Antes de instalar React, necesitas tener instalado:

Node.js y npm

Descarga Node.js desde https://nodejs.org
Recomiendo la versión LTS (Long Term Support)
npm se instala automáticamente con Node.js

verificacion de version:
node --version
npm --version

2. Crear Proyecto React con Vite
Vite es la herramienta moderna recomendada para crear aplicaciones React:
npm create vite@latest EA11

El comando anterior:

Crea una nueva carpeta EA11
Usa la plantilla React de Vite
Configura todo lo necesario automáticamente

3. Instalar Dependencias
Después de crear el proyecto, entra en la carpeta e instala las dependencias:
cd EA11
npm install

El comando anterior descarga todas las dependencias necesarias definidas en package.json, incluyendo:

React
React DOM
Vite y sus herramientas

4. Estructura del Proyecto
La estructura básica que Vite crea es:
EA11/
├── public/           # Archivos estáticos
├── src/              # Código fuente
│   ├── App.css       # Estilos del componente principal
│   ├── App.jsx       # Componente principal
│   ├── assets/       # Imágenes y otros recursos
│   ├── main.jsx      # Punto de entrada
│   └── index.css     # Estilos globales
├── index.html        # Plantilla HTML
├── package.json      # Dependencias y scripts
└── vite.config.js    # Configuración de Vite

5. Iniciar Servidor de Desarrollo
Para iniciar tu aplicación React en modo desarrollo:
npm run dev

El comando anterior:

Inicia un servidor de desarrollo local
Generalmente en http://localhost:5173
Recarga automáticamente la página cuando guardas cambios
Muestra errores y advertencias en la consola

6. Comandos Básicos Útiles
Comandos npm disponibles:

# Iniciar servidor de desarrollo
npm run dev

# Construir versión de producción
npm run build

# Previsualizar versión de producción
npm run preview

# Limpiar caché (si hay problemas)
npm cache clean --force

Comandos útiles durante desarrollo:
# Instalar nuevas dependencias
npm install nombre-paquete

# Instalar dependencia de desarrollo
npm install nombre-paquete --save-dev

# Actualizar dependencias
npm update