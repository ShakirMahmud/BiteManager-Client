import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="text-light-text-primary dark:text-dark-text-primary">
            <div className="container px-6 py-10 mx-auto">
                <div className="lg:flex">
                    {/* Brand Section */}
                    <div className="w-full lg:w-2/5 mb-6 lg:mb-0">
                        <Link to="/" className="flex items-center gap-1">
                            <span className="text-2xl font-bold">
                                <span className="border-b-4 border-light-primary dark:border-dark-primary">
                                    <span className="italic text-light-primary dark:text-dark-primary">Bite</span>
                                </span>
                                <span className="font-semibold text-light-text-secondary dark:text-dark-text-muted italic">Manager</span>
                            </span>
                        </Link>
                        <p className="max-w-sm mt-4 text-light-text-muted dark:text-dark-text-muted">
                            Revolutionizing restaurant management with innovative technology and seamless user experiences.
                        </p>
                        <div className="flex mt-6 space-x-4">
                            <a
                                href="https://www.linkedin.com/in/shakirmahmud9/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light-text-muted dark:text-dark-text-muted hover:text-light-secondary dark:hover:text-dark-secondary"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={24} />
                            </a>
                            <a
                                href="https://www.facebook.com/shakir.mahmud.9/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light-text-muted dark:text-dark-text-muted hover:text-light-secondary dark:hover:text-dark-secondary"
                                aria-label="Facebook"
                            >
                                <FaFacebook size={24} />
                            </a>
                            <a
                                href="https://github.com/ShakirMahmud"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light-text-muted dark:text-dark-text-muted hover:text-light-secondary dark:hover:text-dark-secondary"
                                aria-label="Github"
                            >
                                <FaGithub size={24} />
                            </a>
                            <a
                                href="https://shakir-portfolio.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light-text-muted dark:text-dark-text-muted hover:text-light-secondary dark:hover:text-dark-secondary"
                                aria-label="Portfolio"
                            >
                                <FaGlobe size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="lg:flex-1">
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3">
                            {/* Quick Links */}
                            <div>
                                <h3 className="text-light-secondary dark:text-dark-secondary font-semibold uppercase">Quick Links</h3>
                                <Link to="/allFoods" className="block mt-2 text-sm hover:underline">
                                    All Foods
                                </Link>
                                <Link to="/gallery" className="block mt-2 text-sm hover:underline">
                                    Gallery
                                </Link>
                                <Link to="/myFoods" className="block mt-2 text-sm hover:underline">
                                    My Foods
                                </Link>
                            </div>

                            {/* Services */}
                            <div>
                                <h3 className="text-light-secondary dark:text-dark-secondary font-semibold uppercase">Services</h3>
                                <Link to="/addFood" className="block mt-2 text-sm hover:underline">
                                    Add Food
                                </Link>
                                <Link to="/myOrders" className="block mt-2 text-sm hover:underline">
                                    My Orders
                                </Link>
                            </div>

                            {/* Contact */}
                            <div>
                                <h3 className="text-light-secondary dark:text-dark-secondary font-semibold uppercase">Contact</h3>
                                <span className="block mt-2 text-sm">shakirmahmud50@gmail.com</span>
                                <span className="block mt-2 text-sm">Dhaka, Bangladesh</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-light-card dark:border-dark-card" />

                <div className="text-center">
                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                        © BiteManager 2024 - All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};
// comment

export default Footer;