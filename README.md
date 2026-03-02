vamos a hacer distintos templates, cada uno en su correspondiente rama:

Partiremos del main, con limpieza de codigo.

MAIN BRANCH
==========

1- le agregamos las siguientes librerias a la instalacion: neon, drizzle, form, query, shadcn, better-auth
        pnpm create @tanstack/start@latest

2- limpiamos la demo que viene por defecto, hasta los .env

3- creamos un proyecto nuevo en (https://console.neon.tech/app/projects) y obtenemos la URL de la base de datos.
La colocamos en .env
        BETTER_AUTH_SECRET=4Ja61mQqx8i4YgnrzwQVIU81tGLRLail
        BETTER_AUTH_URL=http://localhost:3000
        DATABASE_URL=

4- colocamos db que estaba en src/db a la carpeta raiz

5- pnpm dlx @better-auth/cli@latest generate
(pasar el archivo que se genero, auth-schema.ts, a db/schema.ts)

6- hacemos el push a la base de datos, para crear las carpetas de better-auth
        npx drizzle-kit push

TODO        
hasta aca, tenemos la base de datos, con las tablas de better-auth
descargar el componente de shadcn de login03
proximo paso, hacer el login, registro, header y rutas protegidas.