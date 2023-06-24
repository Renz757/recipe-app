import React, { useState } from "react";
import ExitIcon from "../UI/exitIcon";
import NavLinks from "./Navigation/NavLinks";

const SideMenu = (props) => {
  return (
    <>
      <div
        className={`w-72 h-screen  bg-darkgold fixed overflow-auto top-44 left-0 transform transition-all ease-in-out duration-600 z-30 ${
          props.isOpen ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        <div onClick={props.setSideBar} className="w-full flex justify-end p-5">
          <ExitIcon/>
        </div>
        <ul className="text-eggshell font-Geologica text-2xl flex flex-col items-start mt-6">
          <NavLinks setSideBar={props.setSideBar} />
        </ul>
      </div>
    </>
  );
};

export default SideMenu;
