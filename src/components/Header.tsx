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
// import { Route } from "@/routes/__root"
import { authClient } from "@/lib/auth-client"

export default function Header() {
	const [theme, setTheme] = useState<"light" | "dark">("light")
	const { data: session } = authClient.useSession()

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
