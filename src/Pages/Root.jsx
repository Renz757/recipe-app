import { Outlet } from "react-router-dom";
import Nav from "../Components/Navigation/Nav";

const RootLayout = () => {
    return (
        <>
            <Nav/>
            <Outlet />
        </>
    );
}

export default RootLayout;