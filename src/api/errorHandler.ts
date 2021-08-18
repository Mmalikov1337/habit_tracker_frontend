import { setAccess } from "@src/store/dataControllers/accessController";
import { setAuth } from "@src/store/dataControllers/authController";
import { setUser } from "@src/store/dataControllers/userController";
import { RefreshResponse, UserState } from "@src/types";
import { Dispatch } from "redux";
import refresh from "./refresh";

export default async function apiErrorHandler(
	data: Response,
	dispatch: Dispatch<any>
): Promise<boolean> {
	if (!data.ok) {
		//есть ошибка
		const statusCode = data.status;
		switch (statusCode) {
			case 419: //access токен истек
				const refreshResponse = await refresh();
				if (!refreshResponse || !refreshResponse.ok) {
					setAccess("", dispatch);
					setUser(new UserState({}), dispatch);
					setAuth({ authentificated: false }, dispatch);
					return false;
				}
				const refreshData: RefreshResponse = await refreshResponse.json();
				setAccess(refreshData.access, dispatch);
				setUser(refreshData.userData, dispatch);
				setAuth({ authentificated: true }, dispatch);
				return true;
			default:
				break;
		}
		return false;
	}
	return true;
}
