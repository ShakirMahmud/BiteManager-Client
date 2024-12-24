import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const fetchFoodById = async (email, axiosSecure) => {
    const response = await axiosSecure.get(`/foods?email=${email}`);
    return response.data;
};

const MyFoods = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedFood, setSelectedFood] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch food data
    const { data: foods, isLoading, isError, error } = useQuery({
        queryKey: ["food", user?.email],
        queryFn: () => fetchFoodById(user?.email, axiosSecure),
        enabled: !!user?.email,
    });

    const handleUpdateClick = (food) => {
        setSelectedFood(food);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedFood(null);
        setIsModalOpen(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const updatedFood = {
            foodName: event.target.foodName.value,
            price: Number(event.target.price.value),
            quantity: Number(event.target.quantity.value),
            description: event.target.description.value,
            foodOrigin: event.target.foodOrigin.value,
            preparationTime: event.target.preparationTime.value,
            isVegetarian: event.target.isVegetarian.checked,
            ingredients: event.target.ingredients.value.split(",").map((i) => i.trim()),
            makingProcedure: event.target.makingProcedure.value,
        };

        try {
            // Update food via API
            await axiosSecure.put(`/foods/${selectedFood._id}`, updatedFood);

            // Show success message
            Swal.fire("Success!", "Food updated successfully!", "success");

            // Invalidate query to fetch updated data
            queryClient.invalidateQueries(["food", user?.email]);

            handleCloseModal();
        } catch (error) {
            console.error("Error updating food:", error);
            Swal.fire("Error!", "Failed to update food!", "error");
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Foods</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Image</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Price</th>
                            <th className="border border-gray-300 p-2">Quantity</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods?.map((food) => (
                            <tr key={food._id}>
                                <td className="border border-gray-300 p-2">
                                    <img
                                        src={food.foodImage}
                                        alt={food.foodName}
                                        className="w-16 h-16 object-cover"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">{food.foodName}</td>
                                <td className="border border-gray-300 p-2">${food.price}</td>
                                <td className="border border-gray-300 p-2">{food.quantity}</td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() => handleUpdateClick(food)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded shadow-lg w-full max-w-[90%] md:w-[50%] relative">
                        <form
                            onSubmit={handleFormSubmit}
                            className="flex flex-col h-full"
                        >
                            <div className="p-6 overflow-y-auto max-h-[70vh] flex-grow">
                                <h2 className="text-xl font-bold mb-4">Update Food</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Food Name</label>
                                    <input
                                        type="text"
                                        name="foodName"
                                        defaultValue={selectedFood.foodName}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        defaultValue={selectedFood.price}
                                        className="w-full p-2 border border-gray-300 rounded "
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        defaultValue={selectedFood.quantity}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        defaultValue={selectedFood.description}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        rows="3"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Food Origin</label>
                                    <input
                                        type="text"
                                        name="foodOrigin"
                                        defaultValue={selectedFood.foodOrigin}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Preparation Time</label>
                                    <input
                                        type="text"
                                        name="preparationTime"
                                        defaultValue={selectedFood.preparationTime}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Ingredients</label>
                                    <input
                                        type="text"
                                        name="ingredients"
                                        defaultValue={selectedFood.ingredients.join(", ")}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Making Procedure</label>
                                    <textarea
                                        name="makingProcedure"
                                        defaultValue={selectedFood.makingProcedure}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        rows="3"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Is Vegetarian?</label>
                                    <input
                                        type="checkbox"
                                        name="isVegetarian"
                                        defaultChecked={selectedFood.isVegetarian}
                                        className="ml-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Added By</label>
                                    <input
                                        type="text"
                                        name="addedByName"
                                        value={selectedFood.addedBy.name}
                                        className="w-full p-2 border border-gray-300 rounded bg-gray-200"
                                        readOnly
                                    />
                                    <input
                                        type="email"
                                        name="addedByEmail"
                                        value={selectedFood.addedBy.email}
                                        className="w-full p-2 border border-gray-300 rounded bg-gray-200 mt-2"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end items-center p-4 border-t border-gray-200 bg-white">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyFoods;
