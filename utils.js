import { redirect } from "react-router-dom";
import { auth } from "./api"
import { signOut } from "firebase/auth";

export async function requireAuth(request) {

  const pathname = new URL(request.url).pathname;
  const redirectPath = `/login?message=You must log in first.&redirectTo=${pathname}`;

  var user = auth.currentUser;

  if (!user) {
    return redirectPath;
  } 
}


  export function userSignOut() {
    signOut(auth)
      .then(() => {
        // Define the pathname where you want to redirect the user after signing out
        const pathname = window.location.pathname;
        const redirectPath = `/login?redirectTo=${pathname}`
        localStorage.setItem('loggedin', 'false');
        console.log(`I am called in the sign out and my value is ${localStorage.getItem('loggedin')}`)
        localStorage.removeItem('userId');
        redirect(redirectPath);
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  }

  export async function validateInputs(price) {
    const numericValue = Number(price);

    if (!isNaN(numericValue)) {
      console.log(numericValue);
      return true;
    } else {
      return false;
    }
  }
