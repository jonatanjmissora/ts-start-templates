export default function SectionContainer({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<section className="w-[90%] 2xl:w-[80%] mx-auto mt-14 2xl:mt-32 flex-1">
			{children}
		</section>
	)
}
