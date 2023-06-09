import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { navActions } from "../../store/nav-slice";

const NavLinks = () => {
  const dispatch = useDispatch();
  const sideBarHandler = () => {
    dispatch(navActions.toggleNav())
  };

  return (
    <>
      <Link to="recipes" className="hover:bg-vandyke w-full p-4 md:w-auto">
        <li onClick={sideBarHandler}>Recipes</li>
      </Link>
      <Link to="favorites" className="hover:bg-vandyke w-full p-4 md:w-auto">
        <li onClick={sideBarHandler}>Favorite</li>
      </Link>
      <Link to="/shoppingList" className="hover:bg-vandyke w-full p-4 md:w-auto">
        <li onClick={sideBarHandler}>Shopping List</li>
      </Link>
      <Link to="/customRecipes" className="hover:bg-vandyke w-full p-4 md:w-auto">
        <li onClick={sideBarHandler}>Custom Recipe</li>
      </Link>
    </>
  );
};

export default NavLinks;
