import React from "react";
import LogoutIcon from "../UI/logoutIcon";

const Profile = ({ user }) => {
  return (
    <>
      <div className="w-screen h-screen bg-eggshell text-center flex flex-col p-32">
        <div className="flex items-center gap-x-3">
          <h2 className="text-xl">User Name:</h2>
          <p className="text-xl">{user.email}</p>
        </div>
        <div className="flex justify-center gap-x-3">
          <h3 className="text-xl font-noto">Logout</h3>
          <LogoutIcon />
        </div>
      </div>
    </>
  );
};

export default Profile;
