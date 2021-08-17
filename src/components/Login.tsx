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

export default function Login() {
	const [email, setEmail] = React.useState<string>("");
	const [password, setUserPassword] = React.useState<string>("");
	const [message, setMessage] = React.useState<string>("");
	const [isLoaded, setIsLoaded] = React.useState(false);

	const dispatch = useDispatch();
	const selector = useSelector((state: { user: UserState }) => state.user);
	const ls = isLoaded ? new LocalStorageHelper() : null;

	React.useEffect(() => {
		setIsLoaded(true);
	}, []);
	const submitForm = async () => {
		if (isLoaded) {
			const responseData = await login(email, password);
			if (!responseData) return;
			if (responseData.status.toString()[0] === "4") {
				setAuth({ authentificated: false }, dispatch);
				setUser(new UserState({}), dispatch);
				removeAccess();
				setMessage("User not found");
				return;
			}
			const data: LoginSucceed = await responseData.json();
			setAuth({ authentificated: true }, dispatch);
			setUser(data.userData, dispatch);
			setAccess(data.access, dispatch);
			setMessage("You are logged in");
		}
	};

	return (
		<MainLayout className="main">
			<div className="login">
				<p>Enter your login and password</p>
				<p>{message}</p>
				{/* <p>{localStorageUser && localStorageUser.name}</p> */}
				<p>{selector.name}</p>
				<form>
					<input
						type="text"
						name="login"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setUserPassword(e.target.value)}
					/>
					<input type="button" value="Submit" onClick={submitForm} />
					{/* <input type="button" value="Submit" onClick={() => asd()} /> */}
				</form>
				<Link href="/auth/register">
					<a>Or create account.</a>
				</Link>
			</div>
		</MainLayout>
	);
}
