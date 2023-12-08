import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/shared/Footer";
import Navbar from "../pages/shared/Navbar";

const Main = () => {
    const location = useLocation();
    console.log(location);
    const navBarFooter = location.pathname.includes('login') || location.pathname.includes('signup')
    return (
        <div>
            { navBarFooter ||  <Navbar></Navbar>}
            <Outlet></Outlet>
            {navBarFooter || <Footer></Footer>}
        </div>
    );
};

export default Main