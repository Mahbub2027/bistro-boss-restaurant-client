import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/HomePages/Home/Home";
import Menu from "../pages/MenuPages/Menu/Menu";
import Order from "../pages/ShopPages/Order/Order";
import Login from "../pages/auth/login/Login";
import Signup from "../pages/auth/Signup/Signup";
import Dashboard from "../layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import PrivateRoutes from "./PrivateRoutes";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/menu',
                element: <Menu></Menu>
            },
            {
                path: '/order/:category',
                element: <Order></Order>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [
            {
                path: 'cart',
                element: <Cart></Cart>
            },
            // addmin user
            {
                path: 'allusers',
                element: <AllUsers></AllUsers>
            },
        ]
    }
])

export default router;