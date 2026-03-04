import { authRouteMiddleware } from "@/lib/route-middleware"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	component: App,
	server: {
		middleware: [authRouteMiddleware],
	},
})

function App() {
	return (
		<div className="flex-1">
			<section className="relative py-20 px-6 text-center overflow-hidden text-white">
				HOME
			</section>
		</div>
	)
}
