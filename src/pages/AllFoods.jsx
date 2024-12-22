import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import axiosPublic from '../hooks/axiosPublic';
import Loading from '../pages/Loading';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


const AllFoods = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [foods, setFoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const subtitle = { text: 'Discover the Best Foods!', color: 'text-green-300' };

    useEffect(() => {
        const fetchFoods = async () => {
            setIsLoading(true);
            try {
                const response = await axiosPublic.get(`/foods?search=${searchQuery}`);
                setFoods(response.data);
            } catch (error) {
                console.error('Error fetching foods:', error);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchFoods();
    }, [searchQuery]);


    return (
        <div className="min-h-screen bg-gray-100">
            {/* Title Section */}
            <div
                className="relative bg-cover bg-center h-80 flex flex-col items-center justify-center text-center px-4"
                style={{ backgroundImage: `url('path-to-your-image')` }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                {/* Title */}
                <h1 className="relative text-5xl md:text-7xl font-bold text-white z-10">
                    Delicious Foods
                </h1>

                {/* Static Subtitle */}
                <div className="relative z-10 mt-4">
                    <p className={`text-lg md:text-2xl font-semibold ${subtitle.color}`}>
                        {subtitle.text}
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative z-10 mt-6 flex items-center space-x-2 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search for foods..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full px-4 py-2 text-gray-800 bg-white rounded-lg shadow-lg outline-none transition-all duration-300 `}
                    />
                    <button
                        onClick={() => setSearchQuery('')} // Optional: clear search on button click
                        className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all"
                    >
                        <FiSearch size={20} />
                    </button>
                </div>
            </div>

            {/* Food Cards Section */}
            <div className="py-10 px-6 max-w-7xl mx-auto">
                {isLoading ? (
                    <Loading />
                ) : foods.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {foods.map((food, index) => (
                            <div
                                key={food._id}
                                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                            >
                                <img
                                    src={food.foodImage}
                                    alt={food.foodName}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{food.foodName}</h3>
                                    <p className="text-gray-600 text-sm">{food.foodCategory}</p>
                                    <p className="text-gray-800 mt-2 font-medium">
                                        Quantity: {food.quantity}
                                    </p>
                                    <button
                                        className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                                        onClick={() => {
                                            navigate(`/food/${food._id}`);
                                        }}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 text-lg">No matching foods found.</div>
                )}
            </div>

        </div>
    );
};

export default AllFoods;
