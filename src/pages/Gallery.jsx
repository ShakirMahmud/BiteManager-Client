import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import useAuth from "../hooks/useAuth";
import img from "../assets/close-up-smiley-friends-restaurant.jpg";
import { Helmet } from "react-helmet-async";

const allImages = [
  { src: "https://i.ibb.co/WgH2N9Q/Egg-Fried-Rice.png", title: "Egg Fried Rice", description: "A delicious classic fried rice with eggs." },
  { src: "https://i.ibb.co/QjX0pJG/Buffalo-Wings.png", title: "Buffalo Wings", description: "Spicy and crispy wings for every occasion." },
  { src: "https://i.ibb.co/VBcWLSx/Tacos.png", title: "Tacos", description: "Mexican tacos loaded with flavors." },
  { src: "https://i.ibb.co/mGVCdxG/Grilled-Cheese-Sandwich.png", title: "Grilled Cheese Sandwich", description: "Melty cheese in crispy bread." },
  { src: "https://i.ibb.co/VxJD6Xk/Tomato Soup.png", title: "Tomato Soup", description: "Warm, comforting, and homemade." },
  { src: "https://i.ibb.co/cTtwFCF/Margarita-Cocktail.png", title: "Margarita Cocktail", description: "Citrusy cocktail with a refreshing kick." },
  { src: "https://i.ibb.co/kgvND2k/Spaghetti-Carbonara.png", title: "Spaghetti Carbonara", description: "Rich and creamy Italian classic." },
  { src: "https://i.ibb.co/Q8f5hP8/Margherita-Pizza.png", title: "Margherita Pizza", description: "Simple and delicious with fresh ingredients." },
  { src: "https://i.ibb.co/zXW4RgC/Caesar-Salad.png", title: "Caesar Salad", description: "Crisp and fresh with creamy dressing." },
  { src: "https://i.ibb.co/K0pMjWN/Vanilla-Ice-Cream.png", title: "Vanilla Ice Cream", description: "Cool, creamy, and classic." },
  { src: "https://i.ibb.co/qnYNK49/Chocolate-Brownie.png", title: "Chocolate Brownie", description: "Rich and decadent chocolate dessert." },
  { src: "https://i.ibb.co/rmgyQfp/Chicken-Alfredo.png", title: "Chicken Alfredo", description: "Creamy and savory Alfredo pasta." },
  { src: "https://i.ibb.co/H2DyJzb/Veggie Wrap.png", title: "Veggie Wrap", description: "Fresh veggies wrapped in a tortilla." },
  { src: "https://i.ibb.co/VpqjHpk/Vegetable-Stir-Fry.png", title: "Vegetable Stir Fry", description: "Crispy vegetables sautéed with savory sauces." },
  { src: "https://i.ibb.co/CwF4hKX/Cheeseburger.png", title: "Cheeseburger", description: "Juicy burger topped with melted cheese." },
  { src: "https://i.ibb.co/6PJjp56/French-Fries.png", title: "French Fries", description: "Golden and crispy fries, a classic snack." },
  { src: "https://i.ibb.co/WDG2x6W/Chicken-Biryani.png", title: "Chicken Biryani", description: "Aromatic and flavorful rice dish." },
  { src: "https://i.ibb.co/f9T8BkK/Pancakes.png", title: "Pancakes", description: "Soft, fluffy pancakes drizzled with syrup." },
  { src: "https://i.ibb.co/q9CZc2D/Sushi-Roll.png", title: "Sushi Roll", description: "Perfectly rolled sushi with fresh ingredients." },
  { src: "https://i.ibb.co/gdxL4fr/Crispy-Spring-Rolls.png", title: "Crispy Spring Rolls", description: "Crunchy rolls filled with savory fillings." },
];

const Gallery = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(allImages.slice(0, 12)); // Show 12 images initially

  const { user } = useAuth();

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const loadMoreImages = () => {
    const currentLength = visibleImages.length;
    if (currentLength < allImages.length) {
      const nextImages = allImages.slice(currentLength, currentLength + 8); 
      setVisibleImages((prevImages) => [...prevImages, ...nextImages]);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
        loadMoreImages();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleImages]);

  return (
    <div className="bg-light-background dark:bg-dark-background min-h-screen py-10 flex flex-col items-center">
      <Helmet>
        <title>Gallery - BiteManager</title>
      </Helmet>

      {/* Title Section */}
      <motion.div
        className="text-center w-full mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="relative w-full bg-cover bg-center h-80 flex flex-col items-center justify-center text-center px-4"
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <h1 className="relative text-5xl md:text-7xl font-bold text-dark-text-primary z-10">Food Gallery</h1>
          <p className="relative z-10 text-lg md:text-2xl font-semibold text-light-secondary dark:text-dark-secondary mt-4">
            Discover and explore delicious meals shared by our community.
          </p>
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        className="grid w-11/12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {visibleImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-56 object-contain bg-light-card dark:bg-dark-card group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg font-semibold">{image.title}</h3>
              <p className="text-gray-300 text-sm mt-1">{image.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={allImages.map((image) => ({ src: image.src }))}
        index={lightboxIndex}
      />
    </div>
  );
};

export default Gallery;
