export default function verifyPageNumber(
	query: string | string[] | undefined,
	min: number = 1,
	max: number = Infinity
): number {
	// if (typeof query !== "string") return min;
	const numberQuery = Number(query);
	if (!numberQuery) {
		console.log("!numberQuery",min);

		return min;
	}
	if (numberQuery < min) {
		console.log("numberQuery ",min);

		return min;
	}
	return numberQuery;
}
