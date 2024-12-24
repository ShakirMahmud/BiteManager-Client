import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axiosPublic from "../hooks/axiosPublic";
import Loading from "../pages/Loading";

const fetchTopFoods = async () => {
    const response = await axiosPublic.get("/limitFoods", {
        params: {
            sortBy: "purchaseCount", // Sort by purchase count
            limit: 6, // Limit results to 6
        },
    });
    return response.data;
};

const TopFoods = () => {
    const { data: foods, isLoading, isError, error } = useQuery({
        queryKey: ["topFoods"],
        queryFn: fetchTopFoods,
    });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 text-xl py-10">
                Error: {error.message}
            </div>
        );
    }

    return (
        <div className="w-4/5 mx-auto py-16">
            {/* Title and Subtitle */}
            <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-bold text-light-primary dark:text-light-primary">Top Selling Foods</h2>
                <p className="text-gray-500 dark:text-light-text-muted text-lg mt-2">
                    These foods are highly purchased by our customers!
                </p>
            </motion.div>

            {/* Cards */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {foods.map((food) => (
                    <motion.div
                        key={food._id}
                        className="border rounded-xl shadow-md p-4 bg-light-card dark:bg-dark-card text-light-text-primary dark:text-dark-text-primary flex flex-col items-center"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Image */}
                        <img
                            src={food.foodImage}
                            alt={food.foodName}
                            className="w-full h-40 object-contain rounded-t-xl"
                        />
                        
                        {/* Title and Info */}
                        <div className="mt-4 text-center">
                            <h3 className="text-lg font-semibold">{food.foodName}</h3>
                            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">{food.foodCategory}</p>
                            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Price: ${food.price}</p>
                        </div>
                        
                        {/* Purchase Count */}
                        <div className="text-sm text-light-text-muted dark:text-dark-text-muted mt-2">
                            Purchased: {food.purchaseCount} times
                        </div>
                        
                        {/* Description */}
                        <p className="text-xs text-light-text-muted dark:text-dark-text-muted mt-2">
                            {food.description}
                        </p>

                        {/* Quick View Button */}
                        <Link to={`/food/${food._id}`} className="w-full">
                            <button
                                className="bg-light-primary dark:bg-dark-primary text-white px-4 py-2 mt-4 rounded-lg w-full hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors"
                            >
                                Quick View
                            </button>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {/* View All Foods Button */}
            <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
            >
                <Link to="/allFoods">
                    <motion.button
                        className="bg-light-primary dark:bg-dark-primary text-white px-6 py-3 rounded-lg hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        View All Foods
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
};

export default TopFoods;
