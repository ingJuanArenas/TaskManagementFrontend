# Task Manager – Frontend (Angular 20 + Tailwind CSS)

Aplicación web para gestionar tareas con autenticación, lista filtrable, detalles, creación/edición y cambio de estado. Construida con Angular standalone components y Tailwind CSS.

## ✨ Características
- Autenticación básica (Basic Auth) contra el backend (`/api/users/me`)
- CRUD de tareas:
  - Listado y búsqueda por nombre
  - Detalle de tarea con acciones rápidas
  - Creación y edición con validaciones de formulario
  - Eliminación
  - Cambio de estado: pending / in_course / completed
- UI responsive con Tailwind CSS
- Arquitectura modular por features y servicios HTTP tipados con TypeScript

## 🧱 Stack y Versiones
- Angular 20 (standalone, `@angular/build:application`)
- TypeScript ~5.8
- RxJS ~7.8
- Tailwind CSS 4

## 📂 Estructura del Proyecto
```
src/
  app/
    app.config.ts          # Router, HttpClient, ZC
    app.routes.ts          # Rutas principales: login, tasks
    app.ts                 # Componente raíz
    features/
      tasks-route.ts       # Rutas hijas: list, new, edit/:id, :id
      components/
        loginpage/
          loginpage.ts
          loginpage.html
        tasks-page/
          tasks-page.ts
          tasks-page.html
        task-card/
          task-card.ts
          task-card.html
        details-page/
          details-page.ts
          details-page.html
        tasks-form/
          tasks-form.ts
          tasks-form.html
      model/
        task.ts            # Interface Task
      service/
        auth-service.ts    # Login (Basic Auth), user$, headers
        task-service.ts    # CRUD + cambio de estado
        auth-guard.ts      # Redirección a /login si no hay usuario
public/
```

## 🔐 Autenticación
- Flujo: en `loginpage` el usuario envía `username` y `password` → `AuthService.login` genera header `Authorization: Basic <base64>` y llama a `GET /api/users/me`.
- Si es exitoso, se publica el usuario en `user$` y se navega a `/tasks`.
- `AuthGuard` protege `/tasks` leyendo `user$` y redirige a `/login` si no hay sesión.

## 🗺️ Rutas
- `/login` → pantalla de acceso
- `/tasks` → listado y búsqueda
- `/tasks/new` → crear tarea
- `/tasks/edit/:taskId` → editar estado de tarea
- `/tasks/:taskId` → detalle de tarea

## 🧾 Modelo de Datos
```ts
export interface Task {
  id: number;
  name: string;
  description: string;
  status: 'pending' | 'in_course' | 'completed';
  deadline: Date | null;
}
```
Nota: En la API algunas acciones usan estado en mayúsculas (por ejemplo, "COMPLETED"/"IN_COURSE"). Verifica la expectativa del backend.

## 🌐 API del Backend (por defecto)
- Base Users: `http://localhost:8080/api/users/me`
- Base Tasks: `http://localhost:8080/api/tasks`
- Endpoints usados por el frontend:
  - `GET /api/users/me` — autentica y devuelve `{ username, role }`
  - `GET /api/tasks` — lista de tareas
  - `GET /api/tasks/{id}` — detalle de tarea
  - `POST /api/tasks` — crear tarea
  - `PUT /api/tasks/{id}` — actualizar (no se usa en este frontend para campos completos)
  - `DELETE /api/tasks/{id}` — eliminar
  - `PUT /api/tasks/{id}/status/{status}` — cambiar estado

Para cambiar las URLs del backend, edita:
- `src/app/features/service/auth-service.ts` → `apiUrl`
- `src/app/features/service/task-service.ts` → `baseUrl`

## 🚀 Empezar
### Requisitos
- Node.js 18+ (recomendado)

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm start
# o
ng serve
```
La app estará disponible en `http://localhost:4200/`.

### Pruebas
```bash
npm test
```

### Build de producción
```bash
npm run build
```
Los artefactos se generan en `dist/`.

## 🧩 Scripts NPM
- `npm start` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run watch` — build en modo watch (desarrollo)
- `npm test` — pruebas con Karma/Jasmine

## 💡 Detalles de UI/UX
- Búsqueda instantánea por nombre en `tasks-page` usando signals
- `task-card` permite ver detalles, completar y eliminar
- `details-page` permite completar, poner en curso o eliminar
- `tasks-form` valida longitud mínima/máxima, fechas futuras y valores de estado admitidos

## 🖼️ Capturas de Pantalla
Vista de Login | Panel de Tareas

<img width="500" height="571" alt="Captura Login" src="https://github.com/user-attachments/assets/36091579-7a88-4e2a-a7ec-2b586b204bb6" />
<img width="760" height="838" alt="Captura Panel" src="https://github.com/user-attachments/assets/4f5705d6-39db-4bfa-83c7-55bff8125d0a" />

Vista de Detalles de Tarea

<img width="719" height="711" alt="Captura Detalle" src="https://github.com/user-attachments/assets/749a244a-d365-4d62-a69d-180591671ec9" />

## ⚙️ Configuración adicional
- Tailwind CSS ya está configurado vía `@tailwindcss/postcss` y `postcss`
- Angular CLI y builder moderno (`@angular/build:application`) ya incluidos

## 📌 Notas
- Si el backend requiere CORS, asegúrate de habilitarlo para `http://localhost:4200`
- Para despliegue estático, sirve el contenido de `dist/` en tu hosting preferido

---

¿Necesitas que el README esté también en inglés o agregar instrucciones de Docker y CI? Pídelo y lo añado.
