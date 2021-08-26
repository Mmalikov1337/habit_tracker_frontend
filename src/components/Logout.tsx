import React from "react";
import jwt from "jsonwebtoken";
import MainLayout from "@layouts/mainLayout";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { LoginSucceed, UserActionTypes, UserState } from "@src/types";
import { setIsAuth, setUserInfo } from "@src/store/actions";
import useLocalStorage from "@src/hooks/useLocalStorage";
import LocalStorageHelper from "@src/helpers/LocalStorageHelper";
import login from "@src/api/login";
import { removeAccess, setAccess } from "@src/store/dataControllers/accessController";
import { setAuth } from "@src/store/dataControllers/authController";
import { setUser } from "@src/store/dataControllers/userController";
import apiErrorHandler from "@src/api/errorHandler";
import logout from "@src/api/logout";

export default function Logout() {
	const [isLoaded, setIsLoaded] = React.useState(false);
	const ls = isLoaded ? new LocalStorageHelper() : null;
	const dispatch = useDispatch();

	React.useEffect(() => {
		setIsLoaded(true);
	}, []);
	async function fetchLogout() {
		if (ls) {
			const logoutData = await logout();
			if (!logoutData) {
				return;
			}
			const succeed = await apiErrorHandler(logoutData, dispatch, async () => await logout());
			if (!succeed) {
				return;
			}
			removeAccess();
			setUser(new UserState({}), dispatch);
			setAuth({ authentificated: false }, dispatch);
		}
	}
	return (
		<MainLayout className="main">
			<div className="logout">
				<p>Are you sure, you want to logout?</p>
				<button onClick={async () => await fetchLogout()}>Yes, i sure.</button>
				<button>No, i change my mind.</button>
			</div>
		</MainLayout>
	);
}
