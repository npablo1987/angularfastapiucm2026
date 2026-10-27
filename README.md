# Gestor de Tareas — Frontend

Aplicación de gestión de tareas (To-Do) construida con **Angular 22** (standalone components, signals, control flow `@if`/`@for`). Consume una API REST de **FastAPI + SQLite** para listar, crear, editar, completar y eliminar tareas.

## Stack técnico

- **Angular 22** (`@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router`)
- **Signals** para el estado reactivo del componente (`tareas`, `editandoId`, `error`)
- **HttpClient** para el consumo de la API
- **RxJS** para el manejo de las peticiones asíncronas
- Backend esperado: **FastAPI** corriendo en `http://localhost:8000`

## Estructura del proyecto

```
src/
└── app/
    ├── app.ts              # Componente raíz: estado y lógica (CRUD de tareas)
    ├── app.html            # Vista: formulario + lista de tareas
    ├── app.css             # Estilos del componente
    ├── app.config.ts       # Configuración/providers de la aplicación
    ├── tarea.model.ts       # Interfaces Tarea y TareaCreate
    └── tarea.service.ts     # Servicio HTTP que habla con la API FastAPI
```

## Funcionalidades

- **Listar** tareas al iniciar la aplicación (`GET /tareas`).
- **Crear** una nueva tarea desde el formulario (`POST /tareas`).
- **Editar** una tarea existente (`PUT /tareas/{id}`).
- **Alternar** el estado completada/pendiente con el checkbox de la lista.
- **Eliminar** una tarea (`DELETE /tareas/{id}`).
- Muestra un mensaje de error si la API no está disponible.

## Requisitos previos

- [Node.js](https://nodejs.org/) (versión compatible con Angular CLI 22)
- [Angular CLI](https://angular.dev/tools/cli) `^22.2.4`
- Backend de la API (FastAPI) corriendo en `http://localhost:8000` con el endpoint `/tareas`

## Instalación

```bash
npm install
```

## Servidor de desarrollo

Para iniciar un servidor de desarrollo local, ejecuta:

```bash
npm start
```

o directamente:

```bash
ng serve
```

Luego abre el navegador en `http://localhost:4200/`. La aplicación se recarga automáticamente al modificar los archivos fuente.

> **Importante:** asegúrate de que la API de FastAPI esté corriendo en el puerto `8000`; de lo contrario, la aplicación mostrará el error *"No se pudo conectar con la API"*.

## Generación de código

Angular CLI incluye herramientas de scaffolding. Para generar un nuevo componente:

```bash
ng generate component component-name
```

Para ver la lista completa de schematics disponibles (`components`, `directives`, `pipes`, etc.):

```bash
ng generate --help
```

## Compilación (build)

Para compilar el proyecto:

```bash
npm run build
```

o:

```bash
ng build
```

Esto compila el proyecto y guarda los artefactos de build en el directorio `dist/`. Por defecto, el build de producción está optimizado para rendimiento y velocidad.

## Pruebas unitarias

Para ejecutar las pruebas unitarias con el test runner [Vitest](https://vitest.dev/):

```bash
ng test
```

## Pruebas end-to-end

Para pruebas end-to-end (e2e):

```bash
ng e2e
```

Angular CLI no incluye un framework de e2e por defecto; puedes elegir el que mejor se adapte a tus necesidades.

## Modelo de datos

```ts
interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
}

type TareaCreate = Omit<Tarea, 'id'>;
```

## Recursos adicionales

Para más información sobre Angular CLI, incluyendo referencias detalladas de comandos, visita [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
