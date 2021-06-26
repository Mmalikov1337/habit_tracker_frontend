import React from 'react'
import jwt from "jsonwebtoken";
import MainLayout from "@layouts/mainLayout";
import Link from "next/link";

export default function Login() {
    const [username, setUsername] = React.useState<string>("");
    const [password, setUserPassword] = React.useState<string>("");
    const [message, setMessage] = React.useState<string>("");

    const submitForm = async () => {
        const responseData = await fetch("http://localhost:3001/auth/login", {
            method:"POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username, password
            })
        });

        console.log("login:", responseData.status);
        const resText = await responseData.text();
        console.log("response", JSON.parse(resText));
    }

    return (
        <MainLayout className="main">
            <div className="login">
                <p>Enter your login and password</p>
                <form>
                    <input type="text" name="login" placeholder="Login" value={username} onChange={e => setUsername(e.target.value)} />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={e => setUserPassword(e.target.value)} />
                    <input type="button" value="Submit" onClick={submitForm} />
                </form>
                <Link href="/auth/register">
                    <a>
                        Or create account.
                    </a>
                </Link>

            </div>
        </MainLayout>

    )
}
