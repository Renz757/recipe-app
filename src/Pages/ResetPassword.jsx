import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase_setup/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsError(false);
    setSuccess(false);
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setMessage(
        "Email has been sent! Check your inbox for further instructions"
      );
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      console.log(error.code);
      console.log(error.message);
    }
  };

  return (
    <div className="p-12  rounded-lg shadow-md bg-eggshell bg-no-repeat w-screen h-screen">
      <div className="w-10/12 mx-auto">
        <form onSubmit={submitHandler} className="max-w-sm mx-auto">
          <h1 className="text-2xl font-bold font-Geologica text-vandyke mb-4 text-center">
            Forgot Password?
          </h1>
          {isError && (
            <div className="bg-red-300 p-3 rounded border-2 border-red-800 mb-2">
              {`Something Went Wrong: ${message}`}
            </div>
          )}
          {success && (
            <div className="bg-green-300 p-3 rounded border-2 border-green-800 mb-2">
              {message}
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

          <div className="flex flex-col gap-y-3">
            <button
              type="submit"
              className="bg-vandyke text-white md:px-4 py-2 rounded"
            >
              Reset Password
            </button>
            <Link
              to="/login"
              className="bg-eggshell text-vandyke border-2 border-vandyke md:px-4 py-2 rounded text-center"
            >
              <button type="button">Log In</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
