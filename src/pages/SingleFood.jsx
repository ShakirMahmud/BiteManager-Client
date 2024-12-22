import { useLoaderData, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosPublic from "../hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../pages/Loading";

const fetchFoodById = async (id) => {
    const response = await axiosPublic.get(`/food/${id}`);
    return response.data;
};

const SingleFood = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: food, isLoading, isError } = useQuery({
        queryKey: ['food', id], // queryKey
        queryFn: () => fetchFoodById(id), // queryFn
        enabled: !!id, // options
      });

    if (isLoading) {
        return <Loading/>;
    }

    // Function to handle Purchase button click
    const handlePurchase = () => {
        // Navigate to the purchase page (you should have a purchase page setup)
        navigate(`/purchase/${food._id}`);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto py-10 px-6">
                {/* Food Details Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Food Image */}
                        <div className="flex-shrink-0 w-full md:w-1/3">
                            <img
                                src={food.foodImage}
                                alt={food.foodName}
                                className="w-full h-64 object-cover rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Food Information */}
                        <div className="flex-1 space-y-4">
                            <h1 className="text-3xl font-bold text-gray-900">{food.foodName}</h1>
                            <p className="text-lg text-gray-700">{food.foodCategory}</p>
                            <p className="text-md text-gray-600">Origin: {food.foodOrigin}</p>
                            <p className="text-md text-gray-600">Price: ${food.price}</p>
                            <p className="text-md text-gray-600">Quantity Available: {food.quantity}</p>

                            {/* Description */}
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800">Description</h3>
                                <p className="text-gray-600">{food.description}</p>
                            </div>

                            {/* Ingredients */}
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800">Ingredients</h3>
                                <ul className="list-disc pl-5 text-gray-600">
                                    {food.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Making Procedure */}
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800">Making Procedure</h3>
                                <p className="text-gray-600">{food.makingProcedure}</p>
                            </div>

                            {/* Nutrition Facts */}
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800">Nutrition Facts</h3>
                                <ul className="text-gray-600">
                                    <li>Calories: {food.nutritionFacts.calories}</li>
                                    <li>Protein: {food.nutritionFacts.protein}g</li>
                                    <li>Carbs: {food.nutritionFacts.carbs}g</li>
                                    <li>Fat: {food.nutritionFacts.fat}g</li>
                                </ul>
                            </div>

                            {/* Preparation Time */}
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800">Preparation Time</h3>
                                <p className="text-gray-600">{food.preparationTime}</p>
                            </div>

                            {/* Vegetarian Status */}
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800">Vegetarian</h3>
                                <p className="text-gray-600">{food.isVegetarian ? 'Yes' : 'No'}</p>
                            </div>

                            {/* Purchase Info */}
                            <div className="flex items-center justify-between mt-6">
                                <div className="text-gray-700">
                                    <h3 className="font-semibold text-lg">Purchase Count</h3>
                                    <p>{food.purchaseCount} purchases this month</p>
                                </div>

                                {/* Purchase Button */}
                                <button
                                    onClick={handlePurchase}
                                    className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
                                >
                                    Purchase
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleFood;
