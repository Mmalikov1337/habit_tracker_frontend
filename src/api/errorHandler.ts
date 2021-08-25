import { setAccess } from "@src/store/dataControllers/accessController";
import { setAuth } from "@src/store/dataControllers/authController";
import { setUser } from "@src/store/dataControllers/userController";
import { RefreshResponse, UserState } from "@src/types";
import { Dispatch } from "redux";
import refresh from "./refresh";

export default async function apiErrorHandler(
	data: Response,
	dispatch: Dispatch<any>,
	onSucceed: (...a: any) => any
): Promise<Response | null> {
	if (!data.ok) {
		//есть ошибк
		const statusCode = data.status;
		switch (statusCode) {
			case 419: //access токен истек
				const refreshResponse = await refresh();
				if (!refreshResponse || !refreshResponse.ok) {
					console.log("!refreshResponse || !refreshResponse.ok");

					setAccess("", dispatch);
					setUser(new UserState({}), dispatch);
					setAuth({ authentificated: false }, dispatch);
					return null;
				}
				const refreshData: RefreshResponse = await refreshResponse.json();
				setAccess(refreshData.access, dispatch);
				setUser(refreshData.userData, dispatch);
				setAuth({ authentificated: true }, dispatch);
				const succeed = await onSucceed(refreshData.access);
				if (!succeed) return null;
				return succeed;
			default:
				break;
		}
		return null;
	}
	return data;
}
