import React, { useState } from "react";
import { auth, googleProvider } from "../firebase_setup/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    //create custom hook to validate in both Login and SignUp components
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError(false);
      alert("please enter valid email");
      setEmailError(true);
      return;
    } else if (password.length < 8) {
      setPasswordError(false);
      alert("password must be longer than 8 characters");
      setPasswordError(true);
      return;
    }

    try {
      setSignInError("");
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setSignInError(`There was an issue signing in: ${error}`);
      console.log(signInError, error);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      setSignInError("");

      const result = await signInWithPopup(auth, googleProvider);
      const credential = await GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    } catch (error) {
      const errorMessage = error.errorMessage;
      setSignInError(errorMessage);
    }
  };

  const handleAnonymousUser = async () => {
    setSignInError("");
    try {
      await signInAnonymously(auth);
      navigate("/");
    } catch (error) {
      setSignInError(error.message);
    }
  };

  return (
    <>
      <div className="p-12  rounded-lg shadow-md bg-eggshell bg-no-repeat w-screen h-screen">
        <div className="w-10/12 mx-auto">
          <form onSubmit={submitHandler} className="max-w-sm mx-auto">
            <h1 className="text-2xl font-bold font-Geologica text-vandyke mb-4 text-center">
              Login
            </h1>
            {signInError && (
              <div className="bg-red-300 p-3 rounded border-2 border-red-800 mb-2">
                {signInError}
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-vandyke"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 p-2 w-full border rounded-md"
                onChange={emailHandler}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-vandyke"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 p-2 w-full border rounded-md"
                onChange={passwordHandler}
              />
            </div>

            <div className="mb-6">
              <Link
                to="/resetPassword"
                className="text-sm text-vandyke hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="flex flex-col gap-y-3">
              <button
                type="submit"
                className="bg-vandyke text-white md:px-4 py-2 rounded"
              >
                Login
              </button>
              <Link
                className="bg-eggshell text-vandyke border-2 border-vandyke md:px-4 py-2 rounded text-center"
                to="/signup"
              >
                <button type="button">Sign Up</button>
              </Link>

              <button
                type="button"
                className="bg-eggshell text-vandyke border-2 border-vandyke md:px-4 py-2 rounded text-center"
                onClick={handleAnonymousUser}
              >
                Continue As Guest
              </button>
            </div>

            <div className="flex justify-center mt-10">
              <GoogleButton onClick={handleGoogleSignin} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
