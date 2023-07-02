import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { navActions } from "../../store";

const NavLinks = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.isOpen)
  const sideBarHandler = () => {
    dispatch(navActions.toggleNav())
  };

  return (
    <>
      <Link to="/" className="hover:bg-vandyke w-full p-4">
        <li onClick={sideBarHandler}>Home</li>
      </Link>
      <Link to="recipes" className="hover:bg-vandyke w-full p-4">
        <li onClick={sideBarHandler}>Recipes</li>
      </Link>
      <Link to="favorites" className="hover:bg-vandyke w-full p-4">
        <li onClick={sideBarHandler}>Favorite</li>
      </Link>
      <Link to="/shoppingList" className="hover:bg-vandyke w-full p-4">
        <li onClick={sideBarHandler}>Shopping List</li>
      </Link>
      <Link to="/customRecipes" className="hover:bg-vandyke w-full p-4">
        <li onClick={sideBarHandler}>Add Custom Recipe</li>
      </Link>
    </>
  );
};

export default NavLinks;
