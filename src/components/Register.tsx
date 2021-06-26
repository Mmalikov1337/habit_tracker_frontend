import React from 'react'
import MainLayout from "@layouts/mainLayout";

export default function Register() {
	const [username, setUsername] = React.useState<string>("");
	const [email, setUserEmail] = React.useState<string>("");
	const [password, setUserPassword] = React.useState<string>("");
	const [bio, setBio] = React.useState<string>("");

	const [serverMessage, setServerMessage] = React.useState<string>("<>");

	const submitForm = async () => {
		const responseData = await fetch("http://localhost:3001/auth/register", {
			// mode: "no-cors",
			method: "POST",
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				username,
				email,
				password,
				bio
			})
		});

		console.log("responseData.status:", responseData.status);
		const resText = await responseData.text();
		console.log("response", JSON.parse(resText));


	}

	return (
		<MainLayout className="main">
			<div className="login">
				<p>Enter your login and password</p>
				<form>
					<input type="text" name="login" placeholder="Login" value={username} onChange={e => setUsername(e.target.value)} />
					<input type="email" name="email" placeholder="email" value={email} onChange={e => setUserEmail(e.target.value)} />
					<input type="password" name="password" placeholder="Password" value={password} onChange={e => setUserPassword(e.target.value)} />
					<textarea name="bio" placeholder="Bio" value={bio} onChange={e => setBio(e.target.value)}></textarea>
					<input type="button" value="Create account" onClick={submitForm} />
				</form>
			</div>
			<p>{serverMessage}</p>
		</MainLayout>
	)
}
