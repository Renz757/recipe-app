import { Outlet } from "react-router-dom";
import Nav from "../Components/Navigation/Nav";

const RootLayout = ({setSearchInput, fecthData}) => {
    return (
        <>
            <Nav fecthData={fecthData} setSearchInput={setSearchInput}/>
            <Outlet />
        </>
    );
}

export default RootLayout;