import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import img1 from '../assets/img1.jpeg';
import img2 from '../assets/close-up-smiley-friends-restaurant.jpg';
import img3 from '../assets/medium-shot-happy-friends-taking-selfie.jpg';

const Banner = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="w-full h-[70vh] lg:h-[85vh] custom-swiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img src={img1} alt="Delicious Burger" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center text-white p-4">
              <h1 className="text-3xl lg:text-5xl font-bold">WE GET WHAT YOU LOVE</h1>
              <p className="mt-2 text-lg lg:text-xl">From Your Favorite Restaurants!</p>
              <button
                className="mt-4 py-2 px-6 text-white rounded-lg"
                style={{ backgroundColor: '#FF6B35' }}
              >
                Explore Menu
              </button>
              <div className="absolute bottom-8 w-full hidden lg:flex justify-center space-x-6 text-sm lg:text-base">
                <div className="flex items-center">
                  <i className="fa fa-clock-o text-xl mr-2"></i>
                  <span>24/7 Delivery</span>
                </div>
                <div className="flex items-center">
                  <i className="fa fa-building text-xl mr-2"></i>
                  <span>2500+ Restaurants</span>
                </div>
                <div className="flex items-center">
                  <i className="fa fa-mobile text-xl mr-2"></i>
                  <span>Order with App</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img src={img2} alt="Happy Friends" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center text-white p-4">
              <h1 className="text-3xl lg:text-5xl font-bold">EAT TOGETHER, STAY TOGETHER</h1>
              <p className="mt-2 text-lg lg:text-xl">Bond Over Amazing Meals With Your Friends</p>
              <button
                className="mt-4 py-2 px-6 text-white rounded-lg"
                style={{ backgroundColor: '#FF6B35' }}
              >
                Discover Restaurants
              </button>
              <div className="absolute bottom-8 w-full hidden lg:flex justify-center space-x-6 text-sm lg:text-base">
                <div className="flex items-center">
                  <i className="fa fa-clock-o text-xl mr-2"></i>
                  <span>24/7 Delivery</span>
                </div>
                <div className="flex items-center">
                  <i className="fa fa-building text-xl mr-2"></i>
                  <span>2500+ Restaurants</span>
                </div>
                <div className="flex items-center">
                  <i className="fa fa-mobile text-xl mr-2"></i>
                  <span>Order with App</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img src={img3} alt="Restaurant Vibes" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center text-white p-4">
              <h1 className="text-3xl lg:text-5xl font-bold">FAST DELIVERY, FRESH FOOD</h1>
              <p className="mt-2 text-lg lg:text-xl">Get Your Food Delivered Anywhere, Anytime!</p>
              <button
                className="mt-4 py-2 px-6 text-white rounded-lg"
                style={{ backgroundColor: '#FF6B35' }}
              >
                Order Now
              </button>
              <div className="absolute bottom-8 w-full lg:flex justify-center space-x-6 text-sm lg:text-base hidden">
                <div className="flex items-center">
                  <i className="fa fa-clock-o text-xl mr-2"></i>
                  <span>24/7 Delivery</span>
                </div>
                <div className="flex items-center">
                  <i className="fa fa-building text-xl mr-2"></i>
                  <span>2500+ Restaurants</span>
                </div>
                <div className="flex items-center">
                  <i className="fa fa-mobile text-xl mr-2"></i>
                  <span>Order with App</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
