import toQueryString from "@src/helpers/toQueryString";
import { Filter } from "@src/types";
import { api_address } from "../config";

export default async function getHabits(accessToken: string, filters?: Filter[]) {
	try {
		const base = `${api_address}/habit`;

		const prepared = filters // Если filters !== undefined то ниже произойдет преобразование из Filter[] в [{filter.field:filter.value},...]
			? filters.map((it) => Object.fromEntries([[it.field, it.value]]))
			: undefined;

		const url = base + toQueryString(prepared);
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
