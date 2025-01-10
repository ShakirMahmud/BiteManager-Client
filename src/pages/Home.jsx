import React from 'react';
import TopFoods from '../components/TopFoods';
import Banner from '../components/Banner';
import DiscountedFood from '../components/DiscountedFood';
import WhyPeopleChoseUs from '../components/WhyPeopleChoseUs';
import { Helmet } from 'react-helmet-async';
import GlobalReach from '../components/GlobalReach';
import ChefSpecial from '../components/ChefSpecial';



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home - BiteManager</title>
            </Helmet>
            <section className='bg-light-background dark:bg-dark-background'><Banner /></section>
            <section className='bg-light-background dark:bg-dark-background'><TopFoods /></section>
            <section className='bg-light-card dark:bg-dark-card py-12 px-2'><DiscountedFood /></section>
            <section className='bg-light-background dark:bg-dark-background'><ChefSpecial /></section>
            <section className='bg-light-card dark:bg-dark-card'><GlobalReach /></section>
            <section><WhyPeopleChoseUs /></section>
        </div>
    );
};

export default Home;