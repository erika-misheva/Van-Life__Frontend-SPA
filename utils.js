import { redirect } from "react-router-dom";
import { auth } from "./api"
import { onAuthStateChanged, signOut } from "firebase/auth";

export async function requireAuth(request) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      const pathname = new URL(request.url).pathname;
      const redirectPath = `/login?message=You must log in first.&redirectTo=${pathname}`;
      
      if (!user) {
        window.location.assign(redirectPath);
      }
      
      resolve(user);
    });
  });
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
