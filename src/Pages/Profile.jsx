import React, { useState } from "react";
import LogoutIcon from "../UI/logoutIcon";
import { auth } from "../firebase_setup/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const [error, setError] = useState("");

  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      setError("");
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      setError("There was an issue  singing out");
    }
    console.log("you have been logged out");
  };

  return (
    <>
      {!user && <p>Please Log in</p>}
      <div className="w-full h-screen font-noto bg-eggshell flex flex-col text-center pt-32 text-2xl">
        <h2 className="mb-5">User Name: {user.email}</h2>

        <div onClick={logoutHandler} className="flex justify-center">
          <h2>Logout</h2> <LogoutIcon />
        </div>
      </div>
    </>
  );
};

export default Profile;
