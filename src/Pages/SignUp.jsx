import React, { useState } from "react";
import { auth } from "../firebase_setup/firebase";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePasswordHandler] = useState("");
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

  const validatePasswordHandler = (event) => {
    setValidatePasswordHandler(event.target.value);
  };

  //todo: move async logic in redux thunk function
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
    } else if (password !== validatePassword) {
      setPasswordError(false);
      alert("passwords do not match");
      setPasswordError(true);
      return;
    }

    try {
      setLoading(true);
      setSignInError("");
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
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
      <div className="p-12 rounded-lg shadow-md bg-eggshell bg-no-repeat w-screen h-screen">
        <div className="w-10/12 mx-auto">
          <form onSubmit={submitHandler} className="max-w-sm mx-auto">
            <h1 className="text-2xl font-bold font-Geologica text-vandyke mb-4 text-center">
              Sign Up
            </h1>
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
            <div className="mb-4">
              <label
                htmlFor="validatePassword"
                className="block text-sm font-medium text-vandyke"
              >
                Re-enter Password
              </label>
              <input
                type="password"
                id="validatePassword"
                name="validatePassword"
                required
                className="mt-1 p-2 w-full border rounded-md"
                onChange={validatePasswordHandler}
              />
            </div>

            <div className="mb-6">
              <a href="#" className="text-sm text-vandyke hover:underline">
                Forgot Username
              </a>
            </div>

            <div className="flex flex-col gap-y-3 ">
              <button
                type="submit"
                className="bg-vandyke text-white md:px-4 py-2 rounded"
              >
                Sign Up
              </button>
              <Link className="bg-eggshell text-vandyke border-2 border-vandyke md:px-4 py-2 rounded text-center" to="/login">
                <button
                  type="button"
                >
                  Log In
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
