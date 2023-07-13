import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { navActions } from "../../store/nav-slice";
import NavLinks from "./NavLinks";
import SearchRecipe from "../SearchRecipe";
import SideMenu from "./SideMenu";
import MenuIcon from "../../UI/menuIcon";
import ShoppingBagIcon from "../../UI/shoppingBagIcon";
import Backdrop from "../../UI/Overlay";

const Nav = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.nav.isOpen);

  const sideBarHandler = () => {
    dispatch(navActions.toggleNav());
  };

  return (
    <>
      {isOpen && (
        <div onClick={sideBarHandler}>
          <Backdrop />
        </div>
      )}
      <div className="bg-darkgold grid grid-cols-12 grid-rows-2 items-center p-7">
        <Link className="col-span-6 md:col-span-2" to="/">
          <h1 className="text-2xl font-Geologica">Recipe App</h1>
        </Link>

        <ul className="hidden md:col-span-10 items-center md:flex md:justify-end text-eggshell font-Geologica text-xl">
          <NavLinks />
        </ul>

        <div className="col-span-6 md:hidden flex items-center justify-end gap-3">
          <Link to="/shoppingList">
            <ShoppingBagIcon />
          </Link>
          <div onClick={sideBarHandler} className="cursor-pointer">
            <MenuIcon />
          </div>
        </div>

        {/* todo: add validation */}
        <div className="col-span-12 p-2 md:p-4">
          <SearchRecipe />
        </div>

        <div className="md:hidden">
          <SideMenu />
        </div>
      </div>
    </>
  );
};

export default Nav;
