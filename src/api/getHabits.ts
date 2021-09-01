import toQueryString from "@src/helpers/toQueryString";
import { Filter, PaginationData } from "@src/types";
import { api_address } from "../config";

export default async function getHabits(
	accessToken: string,
	paginationData: PaginationData,
	filters?: Filter[]
) {
	try {
		const base = `${api_address}/habit`;

		const preparedFilters =
			filters && filters.length > 0 // Если filters !== [] то ниже произойдет преобразование из Filter[] в [{filter.field:filter.value},...]
				? filters.map((it) => Object.fromEntries([[it.field, it.value]]))
				: [];
		console.log("preparedFilters", preparedFilters);

		const preparedPagination = [{ limit: paginationData.limit }, { offset: paginationData.offset }];
		console.log("preparedPagination", preparedPagination);

		const url = base + toQueryString([...preparedFilters, ...preparedPagination]);
		console.log("urlWithQuery", url, filters);

		const responseData = await fetch(url, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${accessToken}`,
			},
			credentials: "include",
		});
		return responseData;
	} catch (e) {
		console.log("getHabits Failed to fetch.", e.message, e.name);
	}
}
