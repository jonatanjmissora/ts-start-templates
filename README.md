## Requisitos

- Node.js 20+
- pnpm
- Una base de datos en [Neon](https://console.neon.tech/app/projects)

## Setup rápido

```bash
pnpm install
cp .env.example .env
```

Completa `.env`:

```env
BETTER_AUTH_SECRET=<generar con: openssl rand -hex 32>
BETTER_AUTH_URL=http://localhost:3000
VITE_BETTER_AUTH_BASE_URL=http://localhost:3000
BETTER_AUTH_BASE_URL=http://localhost:3000
DATABASE_URL=<tu connection string de Neon>
GOOGLE_CLIENT_ID=<opcional>
GOOGLE_CLIENT_SECRET=<opcional>
```

## Base de datos

Las tablas de Better Auth están en `db/users/schema.ts`. Para crearlas en Neon:

```bash
npx drizzle-kit push
```

## Google OAuth (opcional)

0. viendo el video https://www.youtube.com/watch?v=xqd51D3O53k&list=LL&index=8        minuto 35
1. Crea un proyecto en [Google Cloud Console](https://console.cloud.google.com/)
2. Agrega las credenciales en `.env`: `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`
3. En `src/components/login-form.tsx` y `register-form.tsx`, descomenta el `authClient.signIn.social()` dentro del handler de Google

## Desarrollo

```bash
pnpm dev
```

El starter funciona sin base de datos para navegar por las rutas públicas. La autenticación requiere `DATABASE_URL` configurada y `drizzle-kit push` ejecutado.

## Rutas protegidas

Las rutas en `_protected/` tienen el loader comentado en `src/routes/_protected/route.tsx`. Para activar la protección, descomenta:

```ts
loader: async () => await protectedRoute(),
```
