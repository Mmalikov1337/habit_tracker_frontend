import { api_address } from "../config";

export default async function getHabits(accessToken: string, habitId?: number) {
	try {
		const url = habitId ? `${api_address}/habit/${habitId}` : `${api_address}/habit`;
		
		const responseData = await fetch(url, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${accessToken}`,
			},
			credentials: "include",
		});
		// console.log("getHabits", responseData);

		return responseData;
	} catch (e) {
		console.log("getHabits Failed to fetch.", e.message, e.name);
	}
}
