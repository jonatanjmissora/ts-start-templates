import { Link, useNavigate } from "@tanstack/react-router"
import { LogOut, Moon, Sun } from "lucide-react"
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
import { authClient } from "@/lib/auth-client"
import { Route } from "@/routes/__root"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog"

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
		<header className="py-8 w-[90%] 2xl:w-[80%] mx-auto">
			<nav className="flex items-center justify-between">
				<Link to="/" className="text-xl font-semibold">
					Logo
				</Link>

				{session ? (
					<DropdownMenuDemo
						name={session.user?.name}
						theme={theme}
						setTheme={setTheme}
					/>
				) : (
					<div className="flex items-center gap-4">
						<button className="cursor-pointer" onClick={toggleTheme}>
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
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
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
		<DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="cursor-pointer">
					Bienvenido {name}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40 p-4" align="end">
				<DropdownMenuGroup>
					<LogoutAlertDialog setUserMenuOpen={setIsUserMenuOpen} />
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

export function LogoutAlertDialog({
	setUserMenuOpen,
}: {
	setUserMenuOpen: (open: boolean) => void
}) {
	const [open, setOpen] = useState(false)
	const navigate = useNavigate()
	const logout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					// Redirect to home page after successful logout
					navigate({ to: "/login" })
					setUserMenuOpen(false)
				},
			},
		})
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild className="w-[75%] m-4 hover:bg-accent">
				<span className="flex justify-end p-2 rounded-sm cursor-pointer text-sm items-center gap-2">
					Logout <LogOut size={14} className="opacity-50" />
				</span>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>
					¿Estás seguro de que quieres cerrar sesión?
				</AlertDialogTitle>
				<AlertDialogDescription>
					Esto cerrará tu sesión y necesitarás iniciar sesión de nuevo.
				</AlertDialogDescription>
				<div className="flex justify-end gap-4">
					<Button
						variant="outline"
						className="cursor-pointer"
						onClick={() => {
							setOpen(false)
							setUserMenuOpen(false)
						}}
					>
						Cancelar
					</Button>
					<Button className="cursor-pointer" onClick={logout}>
						Confirmar
					</Button>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	)
}
