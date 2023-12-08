import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
    const {user, logOut} = useContext(AuthContext)
    const navOptions = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/contact'>Contact us</NavLink></li>
        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
        <li><NavLink to='/menu'>Our menu</NavLink></li>
        <li><NavLink to='/order/salad'>Our shop</NavLink></li>
    </>

    const handleLogout = () =>{
        logOut()
        .then(()=>{})
        .catch(error=>console.log(error))
    }
    return (
        <div>
            <div className="navbar fixed z-10 bg-opacity-40 bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Bistro Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <>
                        <p>{user?.displayName}</p>
                        <img className="w-10 h-10 rounded-full mx-2" src={user?.photoURL} alt="" />
                        <button onClick={handleLogout} className="btn btn-warning">Logout</button>
                        </> :
                        <>
                        <Link to='/login'><button className="btn btn-warning">Login</button></Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;