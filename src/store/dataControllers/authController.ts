import { isAuthentificatedState } from './../../types/index';
import LocalStorageHelper from "@src/helpers/LocalStorageHelper";
import { Dispatch } from "redux";
import { setIsAuth } from "../actions";


export function setAuth(data: isAuthentificatedState, dispatch:Dispatch<any>) {
	const ls = new LocalStorageHelper();
	ls.setItem("authentificated", data);
	dispatch(setIsAuth(data));
}
