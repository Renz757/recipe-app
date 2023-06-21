import { Link } from "react-router-dom";

const NavLinks = () => {
    return (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="recipes">Recipes</Link></li>
            <li><Link to="favorites">Favorite</Link></li>
        </>
    );
}

export default NavLinks;