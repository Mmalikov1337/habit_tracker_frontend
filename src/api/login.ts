import { api_address } from "../config";

export default async function login(email: string, password: string) {
	try {
		const responseData = await fetch(`${api_address}/auth/login`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				email,
				password,
			}),
		});
		return responseData;
	} catch (e) {
		console.log("login Failed to fetch.", e.message, e.name);
	}
}
