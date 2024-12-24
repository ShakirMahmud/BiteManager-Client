import { RiArrowDropDownLine } from "react-icons/ri";
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();

    const links = <div className='flex gap-4'>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/allFoods'>All Foods</NavLink></li>
        <li><NavLink to='/gallery'>Gallery</NavLink></li>
    </div>

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <NavLink to='/' className="btn btn-ghost text-xl">BiteManager</NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user?.email ?
                            <div className='flex items-center gap-4'>
                                <div className="dropdown dropdown-end border rounded-xl">
                                    <label tabIndex={0} className="btn btn-ghost">
                                        <div className=" rounded-full overflow-hidden flex justify-center items-center">
                                            <img src={user?.photoURL} alt="User Avatar" className="object-cover w-10 h-10 rounded-full" />
                                            <RiArrowDropDownLine className="text-4xl ml-2" />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-64">
                                        <li><Link to='/myFoods'>My Foods</Link></li>
                                        <li><Link to='/addFood'>Add Food</Link></li>
                                        <li><Link to='/myOrders'>My Orders</Link></li>
                                    </ul>
                                </div>
                                <button onClick={logOut} className="btn btn-outline btn-error">Logout</button>
                            </div>

                            :
                            <NavLink to='/login' className="btn btn-outline btn-error">Login</NavLink>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;