import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { navActions } from "../../store/nav-slice";
import ProfileIcon from "../../UI/profileIcon";

const NavLinks = () => {
  const dispatch = useDispatch();
  const sideBarHandler = () => {
    dispatch(navActions.toggleNav())
  };

  return (
    <>
      <Link to="recipes" className="hover:bg-vandyke w-full p-4 md:w-auto transition-all ease-in-out duration-300">
        <li onClick={sideBarHandler}>Recipes</li>
      </Link>
      <Link to="favorites" className="hover:bg-vandyke w-full p-4 md:w-auto transition-all ease-in-out duration-300">
        <li onClick={sideBarHandler}>Favorite</li>
      </Link>
      <Link to="/shoppingList" className="hover:bg-vandyke w-full p-4 md:w-auto transition-all ease-in-out duration-300">
        <li onClick={sideBarHandler}>Shopping List</li>
      </Link>
      <Link to="/customRecipes" className="hover:bg-vandyke w-full p-4 md:w-auto transition-all ease-in-out duration-300">
        <li onClick={sideBarHandler}>Custom Recipe</li>
      </Link>
      <Link to="/profile" className="hidden md:inline-block">
        <ProfileIcon className=""/>
      </Link>
    </>
  );
};

export default NavLinks;
