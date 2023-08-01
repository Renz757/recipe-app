import React, { useState } from "react";
import { auth } from "../firebase_setup/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const reenterPasswordHandler = (event) => {
    setReenterPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

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
    } else if (password !== reenterPassword) {
      setPasswordError(false);
      alert("passwords do not match");
      setPasswordError(true);
      return;
    }

    try {
      setLoading(true);
      setSignInError("");
      await createUserWithEmailAndPassword(auth, email, password);
    } catch {
      setSignInError("Failed to create an account");
      console.log(signInError);
    }
    setLoading(false);

    setEmail("");
    setPassword("");
    setReenterPassword("");
    console.log(email.trim(), password.trim());
  };

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen pb-28 bg-eggshell">
        <form
          onSubmit={submitHandler}
          className="max-w-lg border-2 h-96 border-vandyke rounded-xl grid grid-cols-1 grid-rows-4 p-20 text-xl justify-center items-center"
        >
          <div className="flex flex-col">
            <label>Email</label>
            <input
              className="border"
              type="text"
              onChange={emailHandler}
              value={email}
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              className="border"
              type="password"
              onChange={passwordHandler}
              value={password}
            />
          </div>
          <div className="flex flex-col">
            <label>Renter password</label>
            <input
              className="border"
              type="password"
              onChange={reenterPasswordHandler}
              value={reenterPassword}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 rounded"
            disabled={loading}
          >
            Sign In
          </button>
          <p>Already have an account? Sign In</p>
        </form>
      </div>
    </>
  );
};

export default Login;
