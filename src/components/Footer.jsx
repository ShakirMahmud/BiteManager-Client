import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaReddit } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className=" text-light-text-primary dark:text-dark-text-primary">
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
                            Join 31,000+ others and never miss out on new tips, tutorials, and updates.
                        </p>
                        <div className="flex mt-6 space-x-4">
                            <a
                                href="#"
                                className="text-light-text-muted dark:text-dark-text-muted hover:text-light-secondary dark:hover:text-dark-secondary"
                                aria-label="Reddit"
                            >
                                <FaReddit size={24} />
                            </a>
                            <a
                                href="https://www.facebook.com/shakir.mahmud.9/"
                                className="text-light-text-muted dark:text-dark-text-muted hover:text-light-secondary dark:hover:text-dark-secondary"
                                aria-label="Facebook"
                            >
                                <FaFacebook size={24} />
                            </a>
                            <a
                                href="https://github.com/ShakirMahmud"
                                className="text-light-text-muted dark:text-dark-text-muted hover:text-light-secondary dark:hover:text-dark-secondary"
                                aria-label="Github"
                            >
                                <FaGithub size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="lg:flex-1">
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4">
                            {/* About Section */}
                            <div>
                                <h3 className="text-light-secondary dark:text-dark-secondary font-semibold uppercase">About</h3>
                                <a href="#" className="block mt-2 text-sm hover:underline">
                                    Company
                                </a>
                                <a href="#" className="block mt-2 text-sm hover:underline">
                                    Community
                                </a>
                                <a href="#" className="block mt-2 text-sm hover:underline">
                                    Careers
                                </a>
                            </div>

                            {/* Blog Section */}
                            <div>
                                <h3 className="text-light-secondary dark:text-dark-secondary font-semibold uppercase">Blog</h3>
                                <a href="#" className="block mt-2 text-sm hover:underline">
                                    Tech
                                </a>
                                <a href="#" className="block mt-2 text-sm hover:underline">
                                    Music
                                </a>
                                <a href="#" className="block mt-2 text-sm hover:underline">
                                    Videos
                                </a>
                            </div>

                            {/* Products Section */}
                            <div>
                                <h3 className="text-light-secondary dark:text-dark-secondary font-semibold uppercase">Products</h3>
                                <a href="#" className="block mt-2 text-sm hover:underline">
                                    Mega Cloud
                                </a>
                                <a href="#" className="block mt-2 text-sm hover:underline">
                                    Aperion UI
                                </a>
                                <a href="#" className="block mt-2 text-sm hover:underline">
                                    Meraki UI
                                </a>
                            </div>

                            {/* Contact Section */}
                            <div>
                                <h3 className="text-light-secondary dark:text-dark-secondary font-semibold uppercase">Contact</h3>
                                <span className="block mt-2 text-sm">+1 526 654 8965</span>
                                <span className="block mt-2 text-sm overflow-hidden">shakirmahmud50@gmail.com</span>
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

export default Footer;
