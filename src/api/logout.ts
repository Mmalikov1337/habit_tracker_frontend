import { api_address } from "../config";

export default async function login() {
	try {
		const responseData = await fetch(`${api_address}/auth/logout`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			credentials: "include"
		});
		return responseData;
	} catch (e) {
		console.log("logout Failed to fetch.", e.message, e.name);
	}
}
