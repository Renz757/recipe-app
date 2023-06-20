import { Outlet } from "react-router-dom";
import Nav from "../Components/Navigation/Nav";

const RootLayout = (props) => {
    return (
        <>
            <Nav setRecipeData={props.setRecipeData}/>
            <Outlet />
        </>
    );
}

export default RootLayout;