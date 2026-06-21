# Sistema de Gestión de Calidad (SGC)

## Estructura del Proyecto

```
sgc_2026/
├── backend/          # API REST con Express.js y Sequelize
├── frontend/         # Aplicación Next.js con Tailwind CSS
├── database/         # Scripts de base de datos
├── docker/           # Configuración de Docker Compose
├── docs/             # Diagramas y documentación
└── README.md
```

## Instalación y Ejecución

### Requisitos
- Node.js 18+
- Docker y Docker Compose

### Ejecución con Docker
```bash
cd docker
docker-compose up --build
```

### Ejecución sin Docker

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Tecnologías

- **Backend**: Node.js, Express, Sequelize, PostgreSQL
- **Frontend**: Next.js, React, Tailwind CSS
- **DevOps**: Docker, Docker Compose
