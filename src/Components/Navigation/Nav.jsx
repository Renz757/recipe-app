import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { navActions } from "../../store/nav-slice";
import SearchRecipe from "../SearchRecipe";
import SideMenu from "./SideMenu";
import MenuIcon from "../../UI/menuIcon";
import ShoppingBagIcon from "../../UI/shoppingBagIcon";
import Backdrop from "../../UI/Overlay";

const Nav = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(state => state.isOpen)

  const sideBarHandler = () => {
    dispatch(navActions.toggleNav())
  };

  return (
    <>
      {isOpen && <div onClick={sideBarHandler}><Backdrop /></div>}
      <div className="bg-darkgold flex flex-col justify-center items-center p-7">
        <div className="flex w-full justify-between p-6 items-center">
          <Link to="/">
            <h1 className="text-2xl font-Geologica">Recipe App</h1>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/shoppingList">
              <ShoppingBagIcon />
            </Link>
            <div onClick={sideBarHandler} className="md:hidden cursor-pointer">
              <MenuIcon />
            </div>
          </div>
        </div>
        {/* todo: add validation */}

        <SearchRecipe />
        <SideMenu/>
      </div>
    </>
  );
};

export default Nav;
