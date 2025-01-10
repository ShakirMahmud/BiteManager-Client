// src/components/ChefSpecial.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Utensils, Star, Clock, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChefSpecial = () => {
    const navigate = useNavigate();
    const chefSpecialties = [
        {
            "_id": "676adfd87ded4ce590463c4a",
            "foodName": "Margherita Pizza",
            "foodImage": "https://i.ibb.co/Q8f5hP8/Margherita-Pizza.png",
            "description": "Cheesy and flavorful pizza topped with fresh ingredients.",
            "price": 16,
            "preparationTime": "22 minutes",
            "ingredients": [
                "Pizza base",
                "Cheese",
                "Tomato sauce",
                "Toppings"
            ]
        },
        {
            "_id": "676adfd87ded4ce590463c58",
            "foodName": "Caesar Salad",
            "foodImage": "https://i.ibb.co/zXW4RgC/Caesar-Salad.png",
            "description": "A satisfying main course featuring a protein-rich and well-balanced meal.",
            "price": 33,
            "preparationTime": "51 minutes",
            "ingredients": [
                "Chicken",
                "Rice",
                "Spices",
                "Vegetables"
            ]
        },
        {
            "_id": "676adfd87ded4ce590463c4b",
            "foodName": "Buffalo Wings",
            "foodImage": "https://i.ibb.co/QjX0pJG/Buffalo-Wings.png",
            "description": "Crispy and spicy chicken wings that are perfect for sharing.",
            "price": 32,
            "preparationTime": "13 minutes",
            "ingredients": [
                "Chicken wings",
                "Hot sauce",
                "Butter",
                "Spices"
            ]
        }
    ];

    const [activeImage, setActiveImage] = useState(0);

    const chefStory = {
        name: "Chef Michael Rodriguez",
        bio: "With over 15 years of culinary experience, Chef Michael brings passion and innovation to every dish. Trained in classic French cuisine and inspired by global flavors, he transforms local ingredients into extraordinary culinary experiences.",
    };

    return (
        <div className="py-16 bg-light-background dark:bg-dark-background">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl lg:text-4xl font-bold text-light-primary dark:text-light-primary">
                        Meet Our Chef
                    </h2>
                    <p className="text-gray-500 dark:text-light-text-muted text-lg mt-2 max-w-2xl mx-auto">
                        Culinary artistry and passion on every plate
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Chef Story and Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-20 h-20 bg-light-primary dark:bg-dark-primary rounded-full flex items-center justify-center">
                                <Utensils className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                                    {chefStory.name}
                                </h3>
                                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                                    Executive Chef
                                </p>
                            </div>
                        </div>

                        <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl relative">
                            <Quote className="absolute top-4 left-4 text-light-text-muted dark:text-dark-text-muted opacity-20" size={40} />
                            <p className="text-light-text-secondary dark:text-dark-text-secondary italic">
                                {chefStory.bio}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                                Chef's Specialties
                            </h4>
                            {chefSpecialties.map((specialty, index) => (
                                <button
                                    key={specialty._id}
                                    onClick={() => setActiveImage(index)}
                                    className={`
                                        w-full text-left p-4 rounded-xl transition-all duration-300
                                        ${activeImage === index 
                                            ? 'bg-light-primary dark:bg-dark-primary text-white' 
                                            : 'bg-light-card dark:bg-dark-card hover:bg-light-background dark:hover:bg-dark-background text-gray-800 dark:text-gray-300'}
                                    `}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">{specialty.foodName}</span>
                                        <Star className="w-5 h-5" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Chef's Special Dish Image */}
                    <motion.div
                        key={activeImage}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-xl overflow-hidden shadow-lg bg-light-card dark:bg-dark-card"
                    >
                        <img 
                            src={chefSpecialties[activeImage].foodImage} 
                            alt={chefSpecialties[activeImage].foodName}
                            className="w-full h-96 object-contain"
                        />
                        <div className="p-6 bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border">
                            <h4 className="text-2xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">
                                {chefSpecialties[activeImage].foodName}
                            </h4>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                                {chefSpecialties[activeImage].description}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center space-x-3">
                                    <Clock className="text-light-primary dark:text-dark-primary w-6 h-6" />
                                    <div>
                                        <p className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary">
                                            Preparation Time
                                        </p>
                                        <p className="text-light-text-primary dark:text-dark-text-primary">
                                            {chefSpecialties[activeImage].preparationTime}
                                        </p>
                                    </div>
                                </div>

                                 <div className="flex items-center space-x-3">
                                    <ChefHat className="text-light-primary dark:text-dark-primary w-6 h-6" />
                                    <div>
                                        <p className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary">
                                            Price
                                        </p>
                                        <p className="text-light-text-primary dark:text-dark-text-primary">
                                            ${chefSpecialties[activeImage].price}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h5 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary">
                                    Ingredients
                                </h5>
                                <p className="text-light-text-muted dark:text-dark-text-muted text-sm">
                                    {chefSpecialties[activeImage].ingredients.join(', ')}
                                </p>
                            </div>
                            {/* Add a btn to view more */}
                            <button onClick={() => navigate(`/checkout/${chefSpecialties[activeImage]._id}`)} className="bg-light-primary dark:bg-dark-primary text-white py-2 px-4 rounded-lg mt-4">
                                Order Now!
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ChefSpecial;