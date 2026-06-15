import { createFileRoute, Link, Outlet } from "@tanstack/react-router"
import { protectedRoute } from "@/lib/protected-route"

export const Route = createFileRoute("/_protected")({
	// loader: async () => await protectedRoute(),
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<section className="flex-1 w-full flex flex-col">
			<Outlet />
		</section>
	)
}
