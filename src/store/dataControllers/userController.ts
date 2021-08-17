import { UserState } from "./../../types/index";
import LocalStorageHelper from "@src/helpers/LocalStorageHelper";
import { Dispatch } from "redux";
import { setUserInfo } from "../actions";

export function setUser(data: UserState, dispatch: Dispatch<any>) {
	const ls = new LocalStorageHelper();
	ls.setItem("user", data);
	dispatch(setUserInfo(data));
}
