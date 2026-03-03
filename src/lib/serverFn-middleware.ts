import { createMiddleware } from "@tanstack/react-start"
import { getRequestHeaders } from "@tanstack/react-start/server"
import { auth } from "./auth"

export const authServerFnMiddleware = createMiddleware().server(
	async ({ next }) => {
		const headers = getRequestHeaders()
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
)
