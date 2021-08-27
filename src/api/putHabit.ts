import { Filter, HabitDTO } from "@src/types";
import { api_address } from "../config";

export default async function putHabit(accessToken: string, habitId: number, habitData: HabitDTO) {
	try {
		console.log("habitId", habitId);

		const url = `${api_address}/habit/${habitId}`;
		const responseData = await fetch(url, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${accessToken}`,
			},
			credentials: "include",
			body: JSON.stringify({
				habit: habitData,
			}),
		});

		return responseData;
	} catch (e) {
		console.log("putHabit Failed to fetch.", e.message, e.name);
	}
}
