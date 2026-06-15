import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_protected/route1/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="flex-1 flex items-center justify-center text-2xl font-bold">
			RUTA 1
		</div>
	)
}
