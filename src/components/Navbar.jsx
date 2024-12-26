import { RiArrowDropDownLine } from "react-icons/ri";
import React, { useContext, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ThemeContext } from "../provider/ThemeProvider";
import { BiSun } from "react-icons/bi";
import { MdOutlineDarkMode } from "react-icons/md";

const Navbar = () => {
    const { user, logOut, loading } = useAuth();
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const dropdownRef = useRef(null);
    const location = useLocation();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                dropdownRef.current.querySelector('ul')?.removeAttribute('data-visible');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close dropdown when route changes
    useEffect(() => {
        dropdownRef.current?.querySelector('ul')?.removeAttribute('data-visible');
    }, [location]);

    const NavItem = ({ to, children }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-light-card dark:hover:bg-dark-card ${isActive
                    ? 'text-light-primary dark:text-dark-primary font-semibold'
                    : 'text-light-text-secondary dark:text-dark-text-secondary'
                }`
            }
        >
            {children}
        </NavLink>
    );

    const DropdownItem = ({ to, children }) => (
        <li className="hover:bg-light-card dark:hover:bg-dark-card rounded-lg">
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `block px-4 py-2 w-full ${isActive
                        ? 'text-light-primary dark:text-dark-primary font-semibold'
                        : 'text-light-text-secondary dark:text-dark-text-secondary'
                    }`
                }
            >
                {children}
            </NavLink>
        </li>
    );

    const links = (
        <div className='flex flex-col lg:flex-row gap-2 lg:gap-4 p-2 lg:p-0'>
            <NavItem to='/'>Home</NavItem>
            <NavItem to='/allFoods'>All Foods</NavItem>
            <NavItem to='/gallery'>Gallery</NavItem>
        </div>
    );

    const toggleDropdown = () => {
        const dropdownContent = dropdownRef.current?.querySelector('ul');
        if (dropdownContent?.hasAttribute('data-visible')) {
            dropdownContent.removeAttribute('data-visible');
        } else {
            dropdownContent?.setAttribute('data-visible', 'true');
        }
    };

    return (
        <div className="">
            <div className="">
                <div className=" mx-auto sm:px-2 lg:px-8">
                    <div className="flex justify-around items-center h-16">
                        {/* Logo and Mobile Menu Button */}
                        <div className="flex items-center justify-between  lg:w-auto">
                            <div className="lg:hidden">
                                <div className="dropdown">
                                    <label tabIndex={0} className="btn btn-ghost p-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-light-text-primary dark:text-dark-text-primary"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h8m-8 6h16"
                                            />
                                        </svg>
                                    </label>
                                    <div
                                        tabIndex={0}
                                        className="dropdown-content mt-3 w-52 rounded-xl bg-light-background dark:bg-dark-background shadow-lg ring-1 ring-light-card dark:ring-dark-card"
                                    >
                                        {links}
                                    </div>
                                </div>
                            </div>

                            {/* Logo */}
                            <Link to="/" className="flex items-center gap-1 ml-2 lg:ml-0">
                                <span className="text-2xl font-bold">
                                    <span className="border-b-4 border-light-primary dark:border-dark-primary">
                                        <span className="italic text-light-text-primary dark:text-dark-text-primary">Bite</span>
                                    </span>
                                    <span className="font-semibold text-light-text-muted dark:text-dark-text-muted italic">Manager</span>
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center">
                            {links}
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center lg:gap-4">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card transition-colors"
                            >
                                {isDarkMode ? (
                                    <BiSun className="text-2xl text-dark-primary" />
                                ) : (
                                    <MdOutlineDarkMode className="text-2xl text-light-primary" />
                                )}
                            </button>


                            {loading ? (
                                <button
                                disabled
                                type="button"
                                className="text-white bg-[#5fbbc9] dark:bg-darkBtn font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center"
                            >
                                <svg
                                    aria-hidden="true"
                                    role="status"
                                    className="inline w-4 h-4 me-3 text-white animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Loading...
                            </button>

                            ) : 
                            user?.email ? (
                                <div className="flex items-center gap-2">
                                    <div className="dropdown dropdown-end flex items-center relative" ref={dropdownRef}>
                                        <label
                                            tabIndex={0}
                                            className="cursor-pointer"
                                            onClick={toggleDropdown}
                                        >
                                            <div className="flex items-center p-1 rounded-xl border border-card dark:border-dark-card gap-2">
                                                <img
                                                    src={user?.photoURL}
                                                    alt="User"
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                                <RiArrowDropDownLine className="text-2xl text-light-text-primary dark:text-dark-text-primary hidden lg:block" />
                                            </div>
                                        </label>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content absolute top-full mt-2 right-0 w-64 rounded-xl bg-light-background dark:bg-dark-background shadow-lg ring-1 ring-light-card dark:ring-dark-card p-2 z-50"
                                            data-visible="false"
                                        >
                                            <DropdownItem to="/myFoods">My Foods</DropdownItem>
                                            <DropdownItem to="/addFood">Add Food</DropdownItem>
                                            <DropdownItem to="/myOrders">My Orders</DropdownItem>
                                        </ul>
                                    </div>

                                    <button
                                        onClick={logOut}
                                        className="px-4 py-2 rounded-lg bg-error text-white hover:bg-error/90 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <NavLink
                                    to='/login'
                                    className="px-4 py-2 rounded-lg bg-light-primary dark:bg-dark-primary text-white hover:bg-light-primary/90 dark:hover:bg-dark-primary/90 transition-colors"
                                >
                                    Login
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
