import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const HomeLayout = () => {
    return (
        <div>
            <section className='sticky top-0  z-50 backdrop-blur-md bg-light-background/80 dark:bg-dark-background/80 border-b border-light-card dark:border-dark-card shadow-sm'>
            <header className='lg:w-4/5 mx-auto'>
                <Navbar/>
            </header>
            </section>
            <main>
                <Outlet/>
            </main>
            <footer className='bg-light-background/80 dark:bg-dark-background/80'>
                <Footer/>
            </footer>
            
        </div>
    );
};

export default HomeLayout;