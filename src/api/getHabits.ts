import { api_address } from "../config";

export default async function getHabits(accessToken: string) {
	try {
		const responseData = await fetch(`${api_address}/habit`, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				"authorization": `Bearer ${accessToken}`,
			},
			credentials: "include",
		});
		console.log("getHabits", responseData);

		return responseData;
	} catch (e) {
		console.log("getHabits Failed to fetch.", e.message, e.name);
	}
}
