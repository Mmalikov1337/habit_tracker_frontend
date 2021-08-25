import { Filter } from "@src/types";
import { api_address } from "../config";

export default async function getHabits(accessToken: string, habitId: number) {
	try {
		console.log("habitId",habitId);
		
		const url =`${api_address}/habit/${habitId}` 
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
