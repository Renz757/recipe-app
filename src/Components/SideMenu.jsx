import React, { useState } from "react";
import NavLinks from "./Navigation/NavLinks";

const SideMenu = (props) => {
  return (
    <>
      <div
        className={`w-72 h-screen bg-darkgold fixed overflow-auto top-0 left-0 transform transition-all ease-in-out duration-600 z-30 ${
          props.isOpen ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        <div className="conatiner-fluid h-auto p-6 w-full">
          <div
            className="cursor-pointer flex justify-between"
            onClick={props.setSideBar}
          ></div>
        </div>
        <ul className="text-white text-center">
          <NavLinks />
        </ul>
      </div>
    </>
  );
};

export default SideMenu;
