import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { ArrowUpDown, Clock, MapPin, ChefHat, DollarSign } from "lucide-react";
import Loading from "../pages/Loading";

const fetchFoodById = async (email, axiosSecure) => {
    window.scrollTo(0, 0);
    const response = await axiosSecure.get(`/foods?email=${email}`);
    return response.data;
};

const MyFoods = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedFood, setSelectedFood] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            await axiosSecure.put(`/foods/${selectedFood._id}`, updatedFood);
            Swal.fire("Success!", "Food updated successfully!", "success");
            queryClient.invalidateQueries(["food", user?.email]);
            handleCloseModal();
        } catch (error) {
            console.error("Error updating food:", error);
            Swal.fire("Error!", "Failed to update food!", "error");
        }
    };

    if (isLoading) return <Loading/>;
    if (isError) return <div className="text-center py-10">Error: {error.message}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-light-background to-light-card dark:from-dark-background dark:to-dark-card p-2 sm:p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4 sm:mb-0">
                        My Foods Collection
                    </h1>
                    <div className="w-full sm:w-auto bg-light-card dark:bg-dark-card p-3 rounded-lg shadow">
                        <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Total Items</div>
                        <div className="text-xl font-bold text-light-primary dark:text-dark-primary">
                            {foods?.length || 0}
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-light-background dark:bg-dark-background rounded-lg shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-light-primary dark:bg-dark-primary text-white">
                                <tr>
                                    <th className="p-3 md:p-4 text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="hidden sm:inline">Image</span>
                                            <ArrowUpDown className="h-4 w-4" />
                                        </div>
                                    </th>
                                    <th className="p-3 md:p-4 text-left">Details</th>
                                    <th className="p-3 md:p-4 text-left hidden sm:table-cell">Status</th>
                                    <th className="p-3 md:p-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foods?.map((food, index) => (
                                    <tr 
                                        key={food._id} 
                                        className={`
                                            ${index % 2 === 0 
                                                ? 'bg-light-background dark:bg-dark-background' 
                                                : 'bg-light-card dark:bg-dark-card'
                                            }
                                            hover:bg-light-card/80 dark:hover:bg-dark-card/80 
                                            transition-colors border-b dark:border-gray-700
                                        `}
                                    >
                                        <td className="p-3 md:p-4">
                                            <div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-lg overflow-hidden">
                                                <img
                                                    src={food.foodImage}
                                                    alt={food.foodName}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-3 md:p-4">
                                            <div className="space-y-2">
                                                <h3 className="text-base sm:text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                                                    {food.foodName}
                                                </h3>
                                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                                    <span className="flex items-center gap-1">
                                                        <DollarSign className="h-4 w-4" />
                                                        ${food.price}
                                                    </span>
                                                    <span className="hidden sm:flex items-center gap-1">
                                                        <MapPin className="h-4 w-4" />
                                                        {food.foodOrigin}
                                                    </span>
                                                    <span className="hidden sm:flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {food.preparationTime}
                                                    </span>
                                                </div>
                                                {/* Mobile-only status display */}
                                                <div className="sm:hidden flex flex-wrap gap-2 mt-2">
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                                        In Stock: {food.quantity}
                                                    </span>
                                                    {food.isVegetarian && (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                                                            Vegetarian
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3 md:p-4 hidden sm:table-cell">
                                            <div className="flex flex-col gap-2">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                                    <ChefHat className="h-4 w-4 mr-1" />
                                                    In Stock: {food.quantity}
                                                </span>
                                                {food.isVegetarian && (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                                                        Vegetarian
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-3 md:p-4">
                                            <button
                                                onClick={() => handleUpdateClick(food)}
                                                className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 transition-colors"
                                            >
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-2 sm:p-4">
                    <div className="bg-light-background dark:bg-dark-background rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <form onSubmit={handleFormSubmit} className="flex flex-col">
                            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl sm:text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                                        Update Food Details
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="rounded-full p-2 hover:bg-light-card dark:hover:bg-dark-card"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                            Food Name
                                        </label>
                                        <input
                                            type="text"
                                            name="foodName"
                                            defaultValue={selectedFood.foodName}
                                            className="w-full p-2 border text-light-text-primary dark:text-dark-text-primary rounded-md bg-light-background dark:bg-dark-background border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            defaultValue={selectedFood.price}
                                            className="w-full p-2 border text-light-text-primary dark:text-dark-text-primary rounded-md bg-light-background dark:bg-dark-background border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            defaultValue={selectedFood.quantity}
                                            className="w-full p-2 border text-light-text-primary dark:text-dark-text-primary rounded-md bg-light-background dark:bg-dark-background border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                            Food Origin
                                        </label>
                                        <input
                                            type="text"
                                            name="foodOrigin"
                                            defaultValue={selectedFood.foodOrigin}
                                            className="w-full p-2 border text-light-text-primary dark:text-dark-text-primary rounded-md bg-light-background dark:bg-dark-background border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            defaultValue={selectedFood.description}
                                            rows="3"
                                            className="w-full p-2 border text-light-text-primary dark:text-dark-text-primary rounded-md bg-light-background dark:bg-dark-background border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                            Preparation Time
                                        </label>
                                        <input
                                            type="text"
                                            name="preparationTime"
                                            defaultValue={selectedFood.preparationTime}
                                            className="w-full p-2 border text-light-text-primary dark:text-dark-text-primary rounded-md bg-light-background dark:bg-dark-background border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                            Ingredients (comma-separated)
                                        </label>
                                        <input
                                            type="text"
                                            name="ingredients"
                                            defaultValue={selectedFood.ingredients.join(", ")}
                                            className="w-full p-2 border text-light-text-primary dark:text-dark-text-primary rounded-md bg-light-background dark:bg-dark-background border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                            Making Procedure
                                        </label>
                                        <textarea
                                            name="makingProcedure"
                                            defaultValue={selectedFood.makingProcedure}
                                            rows="3"
                                            className="w-full p-2 border text-light-text-primary dark:text-dark-text-primary rounded-md bg-light-background dark:bg-dark-background border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-light-text-primary dark:text-dark-text-primary cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="isVegetarian"
                                                defaultChecked={selectedFood.isVegetarian}
                                                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-light-primary dark:text-dark-primary focus:ring-light-primary dark:focus:ring-dark-primary"
                                            />
                                            Is Vegetarian?
                                        </label>
                                    </div>

                                    <div className="md:col-span-2 bg-light-card dark:bg-dark-card p-4 rounded-lg space-y-4">
                                        <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">Added By</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                name="addedByName"
                                                value={selectedFood.addedBy.name}
                                                className="w-full p-2 border text-light-text-primary dark:text-dark-text-primary rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                                readOnly
                                            />
                                            <input
                                                type="email"
                                                name="addedByEmail"
                                                value={selectedFood.addedBy.email}
                                                className="w-full p-2 border text-light-text-primary dark:text-dark-text-primary rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 text-sm border text-black dark:text-white border-gray-300 dark:border-gray-600 rounded-md hover:bg-light-card dark:hover:bg-dark-card transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm bg-light-primary dark:bg-dark-primary text-white rounded-md hover:bg-light-primary/90 dark:hover:bg-dark-primary/90 transition-colors"
                                >
                                    Update Food
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
