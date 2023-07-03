import { useSelector, useDispatch } from "react-redux";
import { navActions } from "../../store/nav-slice";
import ExitIcon from "../../UI/exitIcon";
import NavLinks from "./NavLinks";
import SearchRecipe from "../SearchRecipe";
import { Link } from "react-router-dom";

const SideMenu = (props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.isOpen);

  const sideBarHandler = () => {
    dispatch(navActions.toggleNav())
  };

  return (
    <>
      <div
        className={`w-72 h-screen  bg-darkgold fixed overflow-auto top-0 left-0 pt-8 transform transition-all ease-in-out duration-600 z-30 ${
          isOpen ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        <div
          onClick={sideBarHandler}
          className="w-full flex justify-between p-5"
        >
          <Link to="/">
            <h1 className="text-2xl font-Geologica">Recipe App</h1>
          </Link>
          <ExitIcon />
        </div>
        <SearchRecipe
          setRecipeData={props.setRecipeData}
        />
        <ul className="text-eggshell font-Geologica text-2xl flex flex-col items-start mt-6">
          <NavLinks />
        </ul>
      </div>
    </>
  );
};

export default SideMenu;
