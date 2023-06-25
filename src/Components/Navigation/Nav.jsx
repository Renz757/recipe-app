import { Link } from "react-router-dom";
import { useState } from "react";
import SearchRecipe from "../SearchRecipe";
import SideMenu from "./SideMenu";
import MenuIcon from "../../UI/menuIcon";
import ShoppingBagIcon from "../../UI/shoppingBagIcon";
import Backdrop from "../../UI/Overlay";


const Nav = (props) => {
  

  const [isOpen, setIsOpen] = useState(false);

  const sideBarHandler = () => {
    setIsOpen(!isOpen);
    console.log("click");
  };

  return (
    <>
      {isOpen && <Backdrop closeSideBar={sideBarHandler} />}
      <div className="bg-darkgold flex flex-col justify-center items-center p-7 relative z-40">
        <div className="flex w-full justify-between p-6 items-center">
          <Link to="/">
            <h1 className="text-2xl font-Geologica">Recipe App</h1>
          </Link>
          <div className="flex items-center gap-3">
            <ShoppingBagIcon />
            <div onClick={sideBarHandler} className="md:hidden cursor-pointer">
              <MenuIcon />
            </div>
          </div>
        </div>
        {/* todo: add validation */}

        <SearchRecipe setRecipeData={props.setRecipeData}/>
        <SideMenu isOpen={isOpen} setSideBar={sideBarHandler} />
      </div>
    </>
  );
};

export default Nav;
