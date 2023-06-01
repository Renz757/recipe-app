import { Link } from "react-router-dom";

const NavLinks = () => {
    return (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="favorites">Favorite</Link></li>
            <li>Shopping Cart</li>
        </>
    );
}

export default NavLinks;