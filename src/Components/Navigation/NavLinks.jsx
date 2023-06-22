import { Link } from "react-router-dom";

const NavLinks = ({ setIsOpen }) => {
  return (
    <>
      <li>
        <Link onClick={() => setIsOpen(false)} to="/">
          Home
        </Link>
      </li>
      <li>
        <Link onClick={() => setIsOpen(false)} to="/recipes">
          Recipes
        </Link>
      </li>
      <li>
        <Link onClick={() => setIsOpen(false)} to="/favorites">
          Favorite
        </Link>
      </li>
    </>
  );
};

export default NavLinks;