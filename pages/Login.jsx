import React, { Suspense } from "react"
import { useLoaderData, Form, redirect, useActionData, useNavigation, Link, defer, Await } from "react-router-dom"
import { auth } from "../api"
import { signInWithEmailAndPassword } from "firebase/auth"
import '../styles/login.css'

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}
export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host";

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        localStorage.setItem("userId", uid);
        localStorage.setItem("loggedin", 'true');
        console.log(`I am called in the loggin and my value is ${localStorage.getItem('loggedin')}`)
        return redirect(pathname);

    } catch (err) {
        console.error(err.message);
        return new Response(err.message, { status: 400 }); // Return an error response
    }


}



export default function Login() {
    const navigation = useNavigation();
    const message = useLoaderData()
    const error = useActionData();

    return (
        <div className="login-container">

            <Form className="login-form" method="post" replace>
                <h1>Sign in to your account</h1>
                {message && <h3 className="red">{message}</h3>}
                {error && <h3 className="red">{error}</h3>}
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"

                />
                <button
                    disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "submitting"
                        ? "Logging in..."
                        : "Log in"
                    }
                </button>
                <div className="forgot-password">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                <div className="signUp">
                    Need an account? <Link to="/signUp" className="login-link">
                        Sign up
                    </Link>
                </div>
            </Form>
        </div>
    )
}
