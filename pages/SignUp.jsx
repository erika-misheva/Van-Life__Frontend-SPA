import React from "react"
import { useLoaderData, Form, redirect, useActionData, useNavigation, Link } from "react-router-dom"
import { auth } from "../api"
import { createUserWithEmailAndPassword } from "firebase/auth"
import '../styles/login.css'

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}
export async function action({ request }) {
    localStorage.removeItem('userId');
    try {
      const formData = await request.formData();
      const email = formData.get("email");
      const password = formData.get("password");
      const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host";
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      console.log(userCredential.user.uid);
      const uid = userCredential.user.uid;
      localStorage.setItem('userId', uid);
      localStorage.setItem("loggedin", 'true');
      console.log(`I am called in the sign up and my value is ${localStorage.getItem('loggedin')}`)
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
            <h1>Create Account</h1>
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
                        ? "Signing up..."
                        : "Sign up"
                    }
                </button>
                <div className="forgot-password">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                <div className="signUp">
                    Do you have account? <Link to="/login" className="login-link">
                        Login
                    </Link>
                </div>
            </Form>
        </div>
    )
}
