import React, { useState } from "react";
import LogoutIcon from "../UI/logoutIcon";
import { auth } from "../firebase_setup/firebase";

const Profile = ({ user }) => {
  const [error, setError] = useState("");

  const logoutHandler = async () => {
    try {
      setError("");
      await auth.signOut();
    } catch (error) {
      setError("There was an issue  singing out");
    }
    console.log("you have been logged out");
  };

  return (
    <>
      <div className="w-screen h-screen bg-eggshell text-center text-xl flex flex-col p-32">
        <div className="flex items-center gap-x-3">
          <h2 className="">User Name:</h2>
          <p className="">{user.email}</p>
        </div>
        <div onClick={logoutHandler} className="flex justify-center gap-x-3">
          <h3 className="font-noto">Logout</h3>
          <LogoutIcon />
        </div>
      </div>
    </>
  );
};

export default Profile;
