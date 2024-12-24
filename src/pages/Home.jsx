import React from 'react';
import TopFoods from '../components/TopFoods';
import Banner from '../components/Banner';
import DiscountedFood from '../components/DiscountedFood';
import WhyPeopleChoseUs from '../components/WhyPeopleChoseUs';

const Home = () => {
    return (
        <div>
            <section className='bg-light-background dark:bg-dark-background'><Banner/></section>
            <section className='bg-light-background dark:bg-dark-background'><TopFoods/></section>
            <section className='bg-light-card dark:bg-dark-card py-12 px-2'><DiscountedFood/></section>
            <section><WhyPeopleChoseUs/></section>
        </div>
    );
};

export default Home;