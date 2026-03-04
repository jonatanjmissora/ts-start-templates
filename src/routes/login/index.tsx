import { LoginForm } from "@/components/login-form"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/login/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<section className="w-full mt-10 2xl:mt-20">
			<LoginForm />
		</section>
	)
}
