vamos a hacer distintos templates, cada uno en su correspondiente rama:

Partiremos del main, con limpieza de codigo.

MAIN BRANCH
==========

1- le agregamos las siguientes librerias a la instalacion: neon, drizzle, form, query, shadcn, better-auth
        pnpm create @tanstack/start@latest
        pnpm add sonner

2- limpiamos la demo que viene por defecto, hasta los .env
incluimos el sooner en el __root.tsx

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

7- quitamos el plugin de neon de vite.config.ts

TODO        
✅ hasta aca, tenemos la base de datos, con las tablas de better-auth

login03 de shadcn
                npx shadcn@latest add login-03

login-form.tsx
=========
                import { useForm } from "@tanstack/react-form"
                import { toast } from "sonner"
                import * as z from "zod"
                import { Button } from "@/components/ui/button"
                import {
                        Card,
                        CardContent,
                        CardDescription,
                        CardHeader,
                        CardTitle,
                } from "@/components/ui/card"
                import {
                        Field,
                        FieldDescription,
                        FieldError,
                        FieldGroup,
                        FieldLabel,
                        FieldSeparator,
                } from "@/components/ui/field"
                import { Input } from "@/components/ui/input"
                import { cn } from "@/lib/utils"
                import { authClient } from "lib/auth/auth-client"
                import { Link } from "@tanstack/react-router"
                import { useRouter } from "@tanstack/react-router"
                import { useState } from "react"

                const formSchema = z.object({
                        email: z.email("Email inválido"),
                        password: z.string().min(8, "Contraseña mínima de 8 caracteres."),
                })

                export function LoginForm({
                        className,
                        ...props
                }: React.ComponentProps<"div">) {
                        const router = useRouter()
                        const [loading, setLoading] = useState(false)
                        const form = useForm({
                                defaultValues: {
                                        email: "",
                                        password: "",
                                },
                                validators: {
                                        onSubmit: formSchema,
                                },
                                onSubmit: async ({ value }) => {
                                        const result = await authClient.signIn.email({
                                                email: value.email,
                                                password: value.password,
                                                callbackURL: "/",
                                        })
                                        if (result.error) {
                                                toast.error("Email o contraseña incorrectos")
                                                return
                                        }

                                        toast.success("Login exitoso")
                                        router.invalidate()
                                },
                        })

                        const signIn = async () => {
                                setLoading(true)

                                try {
                                        await authClient.signIn.social({
                                                provider: "google",
                                                callbackURL: "/",
                                        })
                                } catch (_err) {
                                        // error ANTES de redirigir
                                        setLoading(false)
                                        toast.error("No se pudo iniciar sesión con Google")
                                }
                        }

                        return (
                                <div className={cn("min-w-1/4 flex flex-col gap-6 w-[95%] sm:w-1/4 mx-auto", className)} {...props}>
                                        <Card>
                                                <CardHeader className="text-center">
                                                        <CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
                                                        <CardDescription>Ingresa con una cuenta de Google</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                        <form
                                                                id="login-form"
                                                                onSubmit={e => {
                                                                        e.preventDefault()
                                                                        form.handleSubmit()
                                                                }}
                                                        >
                                                                <FieldGroup>
                                                                        <Field>
                                                                                <Button variant="outline" type="button" onClick={signIn}>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                                                                <title>Google</title>
                                                                                                <path
                                                                                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                                                                                        fill="currentColor"
                                                                                                />
                                                                                        </svg>
                                                                                        {loading ? "Iniciando..." : "Google"}
                                                                                </Button>
                                                                        </Field>
                                                                        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                                                                O continua con
                                                                        </FieldSeparator>

                                                                        <form.Field
                                                                                name="email"
                                                                                children={field => {
                                                                                        const isInvalid =
                                                                                                field.state.meta.isTouched && !field.state.meta.isValid
                                                                                        return (
                                                                                                <Field data-invalid={isInvalid}>
                                                                                                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                                                                                        <Input
                                                                                                                id={field.name}
                                                                                                                name={field.name}
                                                                                                                value={field.state.value}
                                                                                                                onBlur={field.handleBlur}
                                                                                                                onChange={e => field.handleChange(e.target.value)}
                                                                                                                aria-invalid={isInvalid}
                                                                                                                placeholder="m@example.com"
                                                                                                        />
                                                                                                        {isInvalid && (
                                                                                                                <FieldError errors={field.state.meta.errors} />
                                                                                                        )}
                                                                                                </Field>
                                                                                        )
                                                                                }}
                                                                        />

                                                                        <form.Field
                                                                                name="password"
                                                                                children={field => {
                                                                                        const isInvalid =
                                                                                                field.state.meta.isTouched && !field.state.meta.isValid
                                                                                        return (
                                                                                                <Field data-invalid={isInvalid}>
                                                                                                        <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                                                                                                        <Input
                                                                                                                id={field.name}
                                                                                                                name={field.name}
                                                                                                                value={field.state.value}
                                                                                                                onBlur={field.handleBlur}
                                                                                                                onChange={e => field.handleChange(e.target.value)}
                                                                                                                aria-invalid={isInvalid}
                                                                                                                placeholder="********"
                                                                                                                type="password"
                                                                                                        />
                                                                                                        {isInvalid && (
                                                                                                                <FieldError errors={field.state.meta.errors} />
                                                                                                        )}
                                                                                                </Field>
                                                                                        )
                                                                                }}
                                                                        />

                                                                        <Field>
                                                                                <Button type="submit">Ingresar</Button>
                                                                                <FieldDescription className="text-center">
                                                                                        No tiene cuenta ? <Link to="/register">Registrate</Link>
                                                                                </FieldDescription>
                                                                        </Field>
                                                                </FieldGroup>
                                                        </form>
                                                </CardContent>
                                        </Card>
                                </div>
                        )
                }

register-form.tsx
=============
                import { useForm } from "@tanstack/react-form"
                import { toast } from "sonner"
                import * as z from "zod"
                import { Button } from "@/components/ui/button"
                import {
                        Card,
                        CardContent,
                        CardDescription,
                        CardHeader,
                        CardTitle,
                } from "@/components/ui/card"
                import {
                        Field,
                        FieldDescription,
                        FieldError,
                        FieldGroup,
                        FieldLabel,
                        FieldSeparator,
                } from "@/components/ui/field"
                import { Input } from "@/components/ui/input"
                import { cn } from "@/lib/utils"
                import { authClient } from "lib/auth/auth-client"
                import { Link, useRouter } from "@tanstack/react-router"

                const formSchema = z.object({
                        nombre: z.string().min(3, "Nombre mínimo de 3 caracteres."),
                        email: z.email("Email inválido"),
                        password: z.string().min(8, "Contraseña mínima de 8 caracteres."),
                })

                export function RegisterForm({
                        className,
                        ...props
                }: React.ComponentProps<"div">) {
                        const router = useRouter()
                        const form = useForm({
                                defaultValues: {
                                        nombre: "",
                                        email: "",
                                        password: "",
                                },
                                validators: {
                                        onSubmit: formSchema,
                                },
                                onSubmit: async ({ value }) => {
                                        await authClient.signUp.email(
                                                {
                                                        email: value.email,
                                                        password: value.password,
                                                        name: value.nombre,
                                                        callbackURL: "/",
                                                },
                                                {
                                                        onSuccess: () => {
                                                                toast.success("Registro exitoso")
                                                                router.invalidate()
                                                        },
                                                        onError: ctx => {
                                                                toast.error(ctx.error.message)
                                                        },
                                                }
                                        )
                                },
                        })

                        const signIn = async () => {
                                return await authClient.signIn.social({
                                        provider: "google",
                                        callbackURL: "/",
                                })
                        }

                        return (
                                <div className={cn("min-w-1/4 flex flex-col gap-6", className)} {...props}>
                                        <Card>
                                                <CardHeader className="text-center">
                                                        <CardTitle className="text-xl">Bienvenido a la app</CardTitle>
                                                        <CardDescription>Ingresa con una cuenta de Google</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                        <form
                                                                id="register-form"
                                                                onSubmit={e => {
                                                                        e.preventDefault()
                                                                        form.handleSubmit()
                                                                }}
                                                        >
                                                                <FieldGroup>
                                                                        <Field>
                                                                                <Button variant="outline" type="button" onClick={signIn}>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                                                                <title>Google</title>
                                                                                                <path
                                                                                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                                                                                        fill="currentColor"
                                                                                                />
                                                                                        </svg>
                                                                                        Google
                                                                                </Button>
                                                                        </Field>
                                                                        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                                                                O continua con
                                                                        </FieldSeparator>

                                                                        <form.Field
                                                                                name="nombre"
                                                                                children={field => {
                                                                                        const isInvalid =
                                                                                                field.state.meta.isTouched && !field.state.meta.isValid
                                                                                        return (
                                                                                                <Field data-invalid={isInvalid}>
                                                                                                        <FieldLabel htmlFor={field.name}>Nombre</FieldLabel>
                                                                                                        <Input
                                                                                                                id={field.name}
                                                                                                                name={field.name}
                                                                                                                value={field.state.value}
                                                                                                                onBlur={field.handleBlur}
                                                                                                                onChange={e => field.handleChange(e.target.value)}
                                                                                                                aria-invalid={isInvalid}
                                                                                                                placeholder="ruben blada"
                                                                                                                autoComplete="off"
                                                                                                        />
                                                                                                        {isInvalid && (
                                                                                                                <FieldError errors={field.state.meta.errors} />
                                                                                                        )}
                                                                                                </Field>
                                                                                        )
                                                                                }}
                                                                        />

                                                                        <form.Field
                                                                                name="email"
                                                                                children={field => {
                                                                                        const isInvalid =
                                                                                                field.state.meta.isTouched && !field.state.meta.isValid
                                                                                        return (
                                                                                                <Field data-invalid={isInvalid}>
                                                                                                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                                                                                        <Input
                                                                                                                id={field.name}
                                                                                                                name={field.name}
                                                                                                                value={field.state.value}
                                                                                                                onBlur={field.handleBlur}
                                                                                                                onChange={e => field.handleChange(e.target.value)}
                                                                                                                aria-invalid={isInvalid}
                                                                                                                placeholder="m@example.com"
                                                                                                                autoComplete="off"
                                                                                                        />
                                                                                                        {isInvalid && (
                                                                                                                <FieldError errors={field.state.meta.errors} />
                                                                                                        )}
                                                                                                </Field>
                                                                                        )
                                                                                }}
                                                                        />

                                                                        <form.Field
                                                                                name="password"
                                                                                children={field => {
                                                                                        const isInvalid =
                                                                                                field.state.meta.isTouched && !field.state.meta.isValid
                                                                                        return (
                                                                                                <Field data-invalid={isInvalid}>
                                                                                                        <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
                                                                                                        <Input
                                                                                                                id={field.name}
                                                                                                                name={field.name}
                                                                                                                value={field.state.value}
                                                                                                                onBlur={field.handleBlur}
                                                                                                                onChange={e => field.handleChange(e.target.value)}
                                                                                                                aria-invalid={isInvalid}
                                                                                                                placeholder="********"
                                                                                                                autoComplete="off"
                                                                                                                type="password"
                                                                                                        />
                                                                                                        {isInvalid && (
                                                                                                                <FieldError errors={field.state.meta.errors} />
                                                                                                        )}
                                                                                                </Field>
                                                                                        )
                                                                                }}
                                                                        />

                                                                        <Field>
                                                                                <Button type="submit">Registrar</Button>
                                                                                <FieldDescription className="text-center">
                                                                                        Ya tienes cuenta ? <Link to="/login">Ingresar</Link>
                                                                                </FieldDescription>
                                                                        </Field>
                                                                </FieldGroup>
                                                        </form>
                                                </CardContent>
                                        </Card>
                                </div>
                        )
                }

google client
=========
dentro de https://console.cloud.google.com/apis/dashboard?project=ts-better-auth-neon
viendo el video https://www.youtube.com/watch?v=xqd51D3O53k&list=LL&index=8        minuto 35
en el starter queda en blanco tanto el archivo .env y en los formularios de login y register, quedan deshabilitados los botones de google

lib/route-middleware.ts
==============
        import { redirect } from "@tanstack/react-router";
        import { createMiddleware } from "@tanstack/react-start";
        import { getRequestHeaders } from "@tanstack/react-start/server";
        import { auth } from "./auth/auth";
  
        export const authRouteMiddleware = createMiddleware().server(
                async ({ next }) => {
                const headers = getRequestHeaders();
                const session = await auth.api.getSession({ headers })
                if (!session) {
                        throw redirect({ to: "/login" })
                }
                return next({
                context: {
                        session,
                },
                })
                }
        );

lib/serverFn-middleware.ts
==================
        import { redirect } from "@tanstack/react-router";
        import { createMiddleware } from "@tanstack/react-start";
        import { getRequestHeaders } from "@tanstack/react-start/server";
        import { auth } from "./auth/auth";
        
        export const authRouteMiddleware = createMiddleware().server(
                async ({ next }) => {
                const headers = getRequestHeaders();
                const session = await auth.api.getSession({ headers })
                if (!session) {
                throw new Response("Unauthorized", { status: 401 })
                }
                return next({
                context: {
                        session,
                },
                })
                }
        );

Header
========

instalamos dropmenu
                pnpm dlx shadcn@latest add dropdown-menu

Header.tsx
=========
import { authClient } from "lib/auth/auth-client"
import { Link, useNavigate } from "@tanstack/react-router"
import { Moon, Sun } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Route } from "@/routes/__root"

export default function Header() {
	const [theme, setTheme] = useState<"light" | "dark">("light")
	const { session } = Route.useLoaderData()

	const toggleTheme = () => {
		if (typeof window !== "undefined") {
			const html = document.documentElement
			if (html.classList.contains("dark")) {
				html.classList.remove("dark")
				setTheme("light")
			} else {
				html.classList.add("dark")
				setTheme("dark")
			}
		}
	}

	return (
		<header className="p-4 px-20">
			<nav className="flex items-center justify-between">
				<span className="text-xl font-semibold">Logo</span>

				{session ? (
					<>
						<div className="flex items-center gap-4">
							{/* aqui va el navbar */}
						</div>
						<DropdownMenuDemo
							name={session.user?.name}
							theme={theme}
							setTheme={setTheme}
						/>
					</>
				) : (
					<div className="flex items-center gap-4">
						<Link to="/login">
							<Button>Log In</Button>
						</Link>
						<Link to="/register">
							<Button>Register</Button>
						</Link>
						<button className="" onClick={toggleTheme}>
							{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
						</button>
					</div>
				)}
			</nav>
		</header>
	)
}

export function DropdownMenuDemo({
	name,
	theme,
	setTheme,
}: {
	name: string
	theme: "light" | "dark"
	setTheme: (theme: "light" | "dark") => void
}) {
	const navigate = useNavigate()
	const logout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					// Redirect to home page after successful logout
					navigate({ to: "/login" })
				},
			},
		})
	}

	const toggleTheme = () => {
		if (typeof window !== "undefined") {
			const html = document.documentElement
			if (html.classList.contains("dark")) {
				html.classList.remove("dark")
				setTheme("light")
			} else {
				html.classList.add("dark")
				setTheme("dark")
			}
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="cursor-pointer">
					Bienvenido {name}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40 p-4" align="end">
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={logout} className="flex justify-end m-4">
						Log out
					</DropdownMenuItem>
					<DropdownMenuSeparator />

					<DropdownMenuItem
						onClick={toggleTheme}
						className="flex justify-end m-4"
					>
						Tema {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}


transicion entre login y register
hacer el readme
fin de primer template



