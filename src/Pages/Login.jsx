import React, { useState } from "react";
import { auth } from "../firebase_setup/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, redirect, useNavigate } from "react-router-dom";

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
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setSignInError("There was an issue signing in");
      console.log(signInError, error);
    }
    console.log("logged in");
  };

  return (
    <>
      <div className="p-32 rounded-lg shadow-md bg-eggshell bg-no-repeat w-screen h-screen">
        <div className="w-10/12 mx-auto">
          <form onSubmit={submitHandler} className="max-w-sm mx-auto">
            <h1 className="text-2xl font-bold font-Geologica text-vandyke mb-4 text-center">Login</h1>
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
              <a href="#" className="text-sm text-vandyke hover:underline">
                Forgot password?
              </a>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-vandyke text-white px-4 py-2 rounded"
              >
                Login
              </button>
              <button
                type="button"
                className="bg-eggshell text-vandyke border-2 border-vandyke px-4 py-2 rounded "
              >
                <Link to="/signup">Sign Up</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
