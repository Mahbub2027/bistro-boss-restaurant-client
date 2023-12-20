import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaPaypal, FaShoppingBag, FaShoppingCart, FaThList, FaUser, FaUtensils } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart();

    const [isAdmin] = useAdmin();


    return (
        <div className="flex w-11/12 mx-auto">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-3 text-base">
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to='/dashboard/userHome'>
                                    <FaHome></FaHome>
                                    Admin Home</NavLink></li>
                                <li><NavLink to='/dashboard/addItems'>
                                    <FaUtensils></FaUtensils>
                                    Add Items </NavLink></li>
                                <li><NavLink to='/dashboard/manageItems'>
                                    <FaList></FaList>
                                    Manage Items</NavLink></li>
                                <li><NavLink to='/dashboard/manageBookings'>
                                    <FaBook></FaBook>
                                    Manage Bookings</NavLink></li>
                                <li><NavLink to='/dashboard/allUsers'>
                                    <FaUser></FaUser>
                                    All users</NavLink></li>
                                

                            </> :

                            <>
                                <li><NavLink to='/dashboard/userHome'>
                                    <FaHome></FaHome>
                                    User Home</NavLink></li>
                                <li><NavLink to='/dashboard/cart'>
                                    <FaShoppingCart></FaShoppingCart>
                                    My cart ({cart.length})</NavLink></li>
                                <li><NavLink to='/dashboard/reservation'>
                                    <FaCalendar></FaCalendar>
                                    Reservation</NavLink></li>
                                <li><NavLink to='/dashboard/paymentHistory'>
                                    <FaPaypal></FaPaypal>
                                    Payment History</NavLink></li>
                                <li><NavLink to='/dashboard/myBooking'>
                                    <FaList></FaList>
                                    My Booking</NavLink></li>
                                <li><NavLink to='/dashboard/myBooking'>
                                    <FaAd></FaAd>
                                    Add Review</NavLink></li>
                            </>
                    }

                    {/* shared menu divider */}
                    <div className="divider"></div>
                    <li><NavLink to='/'>
                        <FaHome></FaHome>
                        Home</NavLink></li>
                    <li><NavLink to='/menu'>
                        <FaThList></FaThList>
                        Menu</NavLink></li>
                    <li><NavLink to='/shop'>
                        <FaShoppingBag></FaShoppingBag>
                        Shop</NavLink></li>
                    <li><NavLink to='/contact'>
                        <MdEmail />
                        Contact</NavLink></li>


                </ul>
            </div>
            {/* dashboard contain */}
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;