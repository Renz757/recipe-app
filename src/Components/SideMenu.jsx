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
        <ul className="text-white text-center">
          <NavLinks setSideBar={props.setSideBar}/>
        </ul>
      </div>
    </>
  );
};

export default SideMenu;
