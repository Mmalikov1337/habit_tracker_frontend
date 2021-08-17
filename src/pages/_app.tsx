import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";

import "../styles/index.scss";
import { wrapper } from "@src/store/store";
import { useDispatch } from "react-redux";
import { setAuth } from "@src/store/dataControllers/authController";
import LocalStorageHelper from "@src/helpers/LocalStorageHelper";
import { isAuthentificatedState, UserState } from "@src/types";
import { setUser } from "@src/store/dataControllers/userController";

const App = ({ Component, pageProps }: AppProps) => {
	const dispatch = useDispatch();

	React.useEffect(() => {
		const ls = new LocalStorageHelper();
		let auth: isAuthentificatedState | undefined =
			ls.getItem<isAuthentificatedState>("authentificated");
		if (auth === undefined) {
			// console.log("<INITIAL LOAD>auth === undefined");
			auth = { authentificated: false };
		}
		setAuth(auth, dispatch);

		let user = ls.getItem<UserState>("user");
		if (user === undefined) {
			// console.log("<INITIAL LOAD>user === undefined");
			user = new UserState({});
		}
		setUser(user, dispatch);
	}, []);

	return (
		<>
			<Head>
				<title>Netsyde</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="format-detection" content="telephone=no" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="theme-color" content="#FFFFFF" />
				<link rel="manifest" href="/manifest.json" />
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default wrapper.withRedux(App);
