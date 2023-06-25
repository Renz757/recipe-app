import { Link } from "react-router-dom";

const NavLinks = ({ setSideBar }) => {
  return (
    <>
      <Link to="/" className="hover:bg-vandyke w-full p-4">
        <li onClick={setSideBar}>Home</li>
      </Link>
      <Link to="recipes" className="hover:bg-vandyke w-full p-4">
        <li onClick={setSideBar}>Recipes</li>
      </Link>
      <Link to="favorites" className="hover:bg-vandyke w-full p-4">
        <li onClick={setSideBar}>Favorite</li>
      </Link>
      <Link to="/shoppingList" className="hover:bg-vandyke w-full p-4">
        <li onClick={setSideBar}>Shopping List</li>
      </Link>
      <Link to="/" className="hover:bg-vandyke w-full p-4">
        <li onClick={setSideBar}>Add Custom Recipe</li>
      </Link>
    </>
  );
};

export default NavLinks;
