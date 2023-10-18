import React from "react";
import { useLoaderData, Form, useActionData, useNavigation, Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../api";
import '../styles/login.css'

async function resetPassword(email, auth) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    return new Error("Couldn't reset password.");
  }
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");

  const responseOfResetEmail = await resetPassword(email, auth);

  if (responseOfResetEmail instanceof Error) {
    console.error(responseOfResetEmail.message);
    return new Response(responseOfResetEmail.message, { status: 400 });
  } else {
    const message = "Check your inbox for further instructions";
    return message;
  }
}

export default function ForgotPassword() {
  const navigation = useNavigation();
  const error = useActionData();

  return (
    <div className="login-container">
      <Form className="login-form" method="post" replace>
        <h1>Reset Your Password</h1>
        {error && <h3 className="red">{error}</h3>}
        <input
          name="email"
          type="email"
          placeholder="Email address"
        />
        <button
          disabled={navigation.state === "submitting"}
        >
          Reset Password
        </button>
        <div className="signUp">
          Need an account? <Link to="/signUp" className="login-link">
            Sign up
          </Link>
        </div>
      </Form>
    </div>
  );
}
