# Business Admin Server

Servidor backend para una aplicación de administración de negocios. Este proyecto maneja entidades como productos, proveedores y variedades, utilizando Node.js con TypeScript y MongoDB.

## Características

- API RESTful con rutas para productos, proveedores y variedades.
- Conexión a base de datos MongoDB.
- Código modular utilizando controladores, modelos y rutas.
- Estructura escalable basada en TypeScript.

## Tecnologías utilizadas

- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose
- dotenv

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/business-admin-server.git
   cd business-admin-server
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en la raíz del proyecto y define las variables necesarias:
   ```env
   PORT=3000
   DB_URI=mongodb://localhost:27017/business-admin
   ```

4. Ejecuta el servidor:
   ```bash
   npm run dev
   ```

## Scripts disponibles

- `npm run dev`: Ejecuta el servidor en modo desarrollo.
- `npm run build`: Compila el proyecto a JavaScript.
- `npm start`: Ejecuta la versión compilada.

## Estructura del proyecto

```
src/
├── config/         # Configuraciones de base de datos y entorno
├── controllers/    # Lógica de negocio para cada entidad
├── models/         # Modelos de datos
├── routes/         # Definiciones de rutas
└── server.ts       # Punto de entrada de la aplicación
```

## Endpoints y ejemplos

### Productos

- `GET /api/products`

**Respuesta:**
```json
[
  {
    "_id": "652f6e31c3e28b001f8a4a3e",
    "name": "Café Molido",
    "price": 2500,
    "provider": "Proveedor A"
  }
]
```

- `POST /api/products`

**Body:**
```json
{
  "name": "Yerba Mate",
  "price": 1200,
  "provider": "Proveedor B"
}
```

**Respuesta:**
```json
{
  "_id": "652f6e9bc3e28b001f8a4a3f",
  "name": "Yerba Mate",
  "price": 1200,
  "provider": "Proveedor B",
  "__v": 0
}
```

### Proveedores

- `GET /api/providers`

**Respuesta:**
```json
[
  {
    "_id": "652f6ebac3e28b001f8a4a40",
    "name": "Proveedor A",
    "contact": "contacto@proveedora.com"
  }
]
```

### Variedades

- `GET /api/varieties`

**Respuesta:**
```json
[
  {
    "_id": "652f6ed2c3e28b001f8a4a41",
    "name": "Orgánica",
    "description": "Producto sin químicos"
  }
]
```

## Licencia

Este proyecto está bajo la licencia MIT.
