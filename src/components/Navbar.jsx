import { RiArrowDropDownLine } from "react-icons/ri";
import React, { useContext, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ThemeContext } from "../provider/ThemeProvider";
import { BiSun } from "react-icons/bi";
import { MdOutlineDarkMode } from "react-icons/md";

const Navbar = () => {
    const { user, logOut } = useAuth();
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
                `px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-light-card dark:hover:bg-dark-card ${
                    isActive
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
                    `block px-4 py-2 w-full ${
                        isActive
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
                                        <span className="italic text-light-text-primary dark:text-dark-text-primary">Equi</span>
                                    </span>
                                    <span className="font-semibold text-light-text-muted dark:text-dark-text-muted italic">Sports</span>
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

                            {user?.email ? (
                                <div className="flex items-center gap-2">
                                    <div className="dropdown dropdown-end flex items-center" ref={dropdownRef}>
                                        <label
                                            tabIndex={0}
                                            className="  rounded-xl  cursor-pointer"
                                            onClick={toggleDropdown}
                                        >
                                            <div className="flex items-center p-1 rounded-xl border border-card dark:border-dark-card  gap-2">
                                                <img
                                                    src={user?.photoURL}
                                                    alt="User"
                                                    className="w-8 h-8 rounded-full  object-cover"
                                                />
                                                <RiArrowDropDownLine className="text-2xl text-light-text-primary dark:text-dark-text-primary hidden lg:block" />
                                            </div>
                                        </label>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content mt-2 w-64 rounded-xl bg-light-background dark:bg-dark-background shadow-lg ring-1 ring-light-card dark:ring-dark-card p-2"
                                        >
                                            <DropdownItem to='/myFoods'>My Foods</DropdownItem>
                                            <DropdownItem to='/addFood'>Add Food</DropdownItem>
                                            <DropdownItem to='/myOrders'>My Orders</DropdownItem>
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
