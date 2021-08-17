import LocalStorageHelper from "@src/helpers/LocalStorageHelper";
import { Dispatch } from "redux";

export function setAccess(data: string, dispatch: Dispatch<any>) {
	const ls = new LocalStorageHelper();
	ls.setItem("access", data);
}

export function removeAccess() {
	const ls = new LocalStorageHelper();
	ls.removeItem("access");
}
