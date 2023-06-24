import { Link } from "react-router-dom";

const NavLinks = ({ setSideBar }) => {
  return (
    <>
      <li onClick={setSideBar}>
        <Link to="/">Home</Link>
      </li>
      <li onClick={setSideBar}>
        <Link to="/recipes">Recipes</Link>
      </li>
      <li onClick={setSideBar}>
        <Link to="/favorites">Favorite</Link>
      </li>
    </>
  );
};

export default NavLinks;
