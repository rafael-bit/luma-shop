export default async function Search({
	searchParams,
}: {
	searchParams: {
		query: string;
	};
}) {
	const { query } = await searchParams;

	return (
		<div>
			<p>Search Query: {query}</p>
		</div>
	);
}
