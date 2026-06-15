import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_protected/route2/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="flex-1 flex items-center justify-center text-2xl font-bold">
			RUTA 2
		</div>
	)
}
