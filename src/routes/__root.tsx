import { TanStackDevtools } from "@tanstack/react-devtools"
import type { QueryClient } from "@tanstack/react-query"
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import Header from "../components/Header"

import appCss from "../styles.css?url"
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools"
import { Toaster } from "sonner"
import { Session } from "better-auth"
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary"
import { NotFound } from "@/components/NotFound"
import { getSession } from "server/get-session"
import { getThemeServerFn } from "server/theme"

export type RouterContext = {
	session: Session | null
	queryClient: QueryClient
	theme: "light" | "dark" | "auto"
}

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	beforeLoad: async () => ({
		theme: ((await getThemeServerFn()) ?? "auto") as "light" | "dark" | "auto",
		session: await getSession(),
	}),
	shellComponent: RootDocument,
	errorComponent: DefaultCatchBoundary,
	notFoundComponent: () => <NotFound />,
})

function RootDocument({ children }: { children: React.ReactNode }) {
	const { theme } = Route.useRouteContext()

	return (
		<html
			lang="en"
			className={`w-[svw] overflow-x-hidden px-[5svw] sm:px-[20svw] 2xl:px-[30svw] ${theme}`}
		>
			<head>
				<HeadContent />
			</head>
			<body className="w-full flex flex-col min-h-screen">
				<Header />
				{children}
				<footer className="w-full flex items-center justify-center my-2 text-xs">
					LOGO {new Date().getFullYear()}
				</footer>
				<Toaster />
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	)
}
