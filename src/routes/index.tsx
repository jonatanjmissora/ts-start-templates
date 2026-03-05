import { authRouteMiddleware } from "@/lib/route-middleware"
import { createFileRoute } from "@tanstack/react-router"
import SectionContainer from "@/components/layout/section-container"

export const Route = createFileRoute("/")({
	component: App,
	server: {
		middleware: [authRouteMiddleware],
	},
})

function App() {
	return (
		<div className="flex-1">
			<SectionContainer>HOME</SectionContainer>
		</div>
	)
}
