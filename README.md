# Sistema de Gestión de Calidad (SGC) - Universidad Nacional de Trujillo

## Estructura del Proyecto

```
sgc_2026/
├── backend/          # API REST con Express.js y Sequelize
├── frontend/         # Aplicación Next.js con Tailwind CSS
├── database/         # Scripts de base de datos (init.sql y seeder.sql)
├── docker/           # Configuración de Docker Compose
├── docs/             # Diagramas y documentación
└── README.md
```

## Instalación y Ejecución

### Requisitos
- Node.js 18+
- Docker y Docker Compose

### Ejecución con Docker (Recomendado)

1. Clonar el repositorio
2. Navegar al directorio de docker:
   ```bash
   cd docker
   ```
3. Iniciar los servicios:
   ```bash
   docker-compose up --build
   ```
4. Acceder a la aplicación:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001
   - PostgreSQL: localhost:5432

### Ejecución sin Docker

#### Backend
1. Navegar al directorio del backend:
   ```bash
   cd backend
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Copiar el archivo de ejemplo de variables de entorno:
   ```bash
   cp .env.example .env
   ```
4. Editar `.env` con tus credenciales de base de datos
5. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

#### Frontend
1. Navegar al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Credenciales por Defecto

- **Usuario Administrador**:
  - Correo: `admin@unitru.edu.pe`
  - Contraseña: `UntSgc2026!`

## Aplicar Seeder en Base de Datos Existente

Si ya habías ejecutado el sistema antes y quieres aplicar el seeder sin reiniciar la base de datos:

1. Conectarse al contenedor de PostgreSQL:
   ```bash
   cd docker
   docker-compose exec postgres psql -U sgc_user -d sgc_db
   ```
2. Ejecutar el seeder:
   ```sql
   \i /docker-entrypoint-initdb.d/seeder.sql
   ```

## Tecnologías

- **Backend**: Node.js, Express, Sequelize, PostgreSQL
- **Frontend**: Next.js 14, React, Tailwind CSS
- **DevOps**: Docker, Docker Compose
