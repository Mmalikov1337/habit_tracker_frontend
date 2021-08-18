import { setAccess } from "@src/store/dataControllers/accessController";
import { setAuth } from "@src/store/dataControllers/authController";
import { setUser } from "@src/store/dataControllers/userController";
import { RefreshResponse, UserState } from "@src/types";
import { api_address } from "../config";

export default async function refresh() {
	try {
		const responseData = await fetch(`${api_address}/auth/refresh`, {
			method: "POST",
			credentials: "include",
		});
		return responseData;
		// if()
		// if (!data.ok) {
		// 	switch (data.status) {
		// 		case 419:
		// 			const refreshFetched = await fetch(`${api_address}/auth/refresh`, {
		// 				method: "POST",
		// 				credentials: "include",
		// 			});
		// 			if (!refreshFetched || !refreshFetched.ok) {
		// 				setAccess("", dispatch);
		// 				setUser(new UserState({}), dispatch);
		// 				setAuth({ authentificated: false }, dispatch);
		// 				// console.log("!refreshFetched", refreshFetched);
		// 				return;
		// 			}
		// 			if (refreshFetched.ok) {
		// 				const refreshData: RefreshResponse = await refreshFetched.json();
		// 				setAccess(refreshData.access, dispatch);
		// 				setUser(refreshData.userData, dispatch);
		// 				setAuth({ authentificated: true }, dispatch);
		// 				return await fetchHabits();
		// 			}
		// 			break;
		// 		default:
		// 			break;
		// 	}
		// 	return;
		// }
	} catch (e) {
		console.log("refresh Failed to fetch.", e.message, e.name);
	}
}
