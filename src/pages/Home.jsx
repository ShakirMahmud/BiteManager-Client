import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import TopFoods from '../components/TopFoods';
import Banner from '../components/Banner';

const Home = () => {
    return (
        <div>
            <section className='bg-light-background dark:bg-dark-background'><Banner/></section>
            <section className='bg-light-background dark:bg-dark-background'><TopFoods/></section>
            <section>Another meaningful Section</section>
            <section>Another meaningful Section</section>
        </div>
    );
};

export default Home;