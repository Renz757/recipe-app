import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const reenterPasswordHandler = (event) => {
    setReenterPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailError(false)
      alert("please enter valid email");
      setEmailError(true);
      return 
    } else if (password.length < 8) {
        setPasswordError(false)
        alert("password must be longer than 8 characters");
        setPasswordError(true)
        return
    } else if (password !== reenterPassword ) {
        setPasswordError(false)
        alert("passwords do not match")
        setPasswordError(true)
        return
    }

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
            <input className="border" type="text" onChange={emailHandler} />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              className="border"
              type="password"
              onChange={passwordHandler}
            />
          </div>
          <div className="flex flex-col">
            <label>Renter password</label>
            <input
              className="border"
              type="password"
              onChange={reenterPasswordHandler}
            />
          </div>
          <button type="submit" className="bg-blue-500 rounded">
            Sign In
          </button>
          <p>Already have an account? Sign In</p>
        </form>
      </div>
    </>
  );
};

export default Login;
