import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import TopFoods from '../components/TopFoods';

const Home = () => {
    return (
        <div>
            <section>Banner</section>
            <section><TopFoods/></section>
            <section>Another meaningful Section</section>
            <section>Another meaningful Section</section>
        </div>
    );
};

export default Home;