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

  const navigate = useNavigate()

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
      navigate("/")
    } catch (error) {
      setSignInError("There was an issue signing in");
      console.log(signInError, error);
    }
    console.log("logged in");
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen pb-28 bg-eggshell flex-col gap-y-5">
      <h1 className="text-3xl">Login</h1>
      <form
        onSubmit={submitHandler}
        className="max-w-lg border-2 h-96 border-vandyke rounded-xl grid grid-cols-1 grid-rows-4 p-20 text-xl justify-center items-center"
      >
        <div className="flex flex-col">
          <label>Email</label>
          <input
            onChange={emailHandler}
            value={email}
            className="border"
            type="text"
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            onChange={passwordHandler}
            value={password}
            className="border"
            type="password"
          />
        </div>
        <button type="submit" className="bg-blue-500 rounded">
          Sign In
        </button>
        <div className="flex gap-2 items-center">
          <p>Don't have an account?</p>
          <Link to="signup" className="text-blue-500">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
