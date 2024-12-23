import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axiosPublic from "../hooks/axiosPublic";
import Loading from "../pages/Loading";

const fetchTopFoods = async () => {
    const response = await axiosPublic.get("/foods", {
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
        return <Loading/>;
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 text-xl py-10">
                Error: {error.message}
            </div>
        );
    }

    return (
        <div className="py-10 px-6">
            {/* Title and Subtitle */}
            <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-bold text-blue-600">Top Selling Foods</h2>
                <p className="text-gray-500 text-lg mt-2">
                    These foods are highly purchased by our customers!
                </p>
            </motion.div>

            {/* Cards */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {foods.map((food) => (
                    <motion.div
                        key={food._id}
                        className="border rounded-lg shadow-lg p-4 flex flex-col items-center bg-white"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={food.foodImage}
                            alt={food.foodName}
                            className="w-full h-40 object-cover rounded"
                        />
                        <h3 className="text-xl font-bold mt-4">{food.foodName}</h3>
                        <p className="text-gray-600">Category: {food.foodCategory}</p>
                        <p className="text-gray-600">Price: ${food.price}</p>
                        <p className="text-gray-600">
                            Purchased: {food.purchaseCount} times
                        </p>
                        <p className="text-sm text-gray-500 mt-2">{food.description}</p>

                        {/* View Details Button */}
                        <Link to={`/food/${food._id}`}>
                            <motion.button
                                className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-700 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                View Details
                            </motion.button>
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
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
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
