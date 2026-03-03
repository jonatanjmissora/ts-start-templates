import { createFileRoute } from "@tanstack/react-router"
import { RegisterForm } from "@/components/register-form"

export const Route = createFileRoute("/register/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<section className="w-full mt-20">
			<RegisterForm />
		</section>
	)
}
