import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddFood = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get form data
    const form = e.target;
    const formData = {
      foodName: form.foodName.value,
      foodImage: form.foodImage.value,
      foodCategory: form.foodCategory.value,
      quantity: parseInt(form.quantity.value),
      price: parseInt(form.price.value),
      addedBy: {
        name: user?.displayName,
        email: user?.email
      },
      foodOrigin: form.foodOrigin.value,
      description: form.description.value,
      ingredients: form.ingredients.value.split(',').map(item => item.trim()),
      makingProcedure: form.makingProcedure.value,
      nutritionFacts: {
        calories: parseInt(form.calories.value),
        protein: parseInt(form.protein.value),
        carbs: parseInt(form.carbs.value),
        fat: parseInt(form.fat.value)
      },
      popularity: parseInt(form.popularity.value),
      preparationTime: form.preparationTime.value,
      isVegetarian: form.isVegetarian.checked
    };

    try {
      const response = await axiosSecure.post('/foods', formData);
      
      if (response.data.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Food item added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        // form.reset();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to add food item',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Food Item</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Food Name */}
            <div>
              <label className="block text-gray-700 mb-2">Food Name</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded"
                name="foodName"
                placeholder="Enter food name"
                required
              />
            </div>

            {/* Food Image */}
            <div>
              <label className="block text-gray-700 mb-2">Food Image URL</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded"
                name="foodImage"
                placeholder="Enter food image URL"
                required
              />
            </div>

            {/* Food Category */}
            <div>
              <label className="block text-gray-700 mb-2">Food Category</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded"
                name="foodCategory"
                placeholder="Enter food category"
                required
              />
            </div>

            {/* Food Origin */}
            <div>
              <label className="block text-gray-700 mb-2">Food Origin</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded"
                name="foodOrigin"
                placeholder="Enter food origin (country)"
                required
              />
            </div>
          </div>
        </div>

        {/* Quantity and Price Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quantity and Price</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Quantity */}
            <div>
              <label className="block text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded"
                name="quantity"
                placeholder="Enter quantity"
                min="0"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 mb-2">Price</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded"
                name="price"
                placeholder="Enter price"
                min="0"
                required
              />
            </div>

            {/* Preparation Time */}
            <div>
              <label className="block text-gray-700 mb-2">Preparation Time</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded"
                name="preparationTime"
                placeholder="e.g., 15 minutes"
                required
              />
            </div>
          </div>
        </div>

        {/* Nutrition Facts Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Nutrition Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Calories */}
            <div>
              <label className="block text-gray-700 mb-2">Calories</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded"
                name="calories"
                placeholder="Calories"
                min="0"
                required
              />
            </div>

            {/* Protein */}
            <div>
              <label className="block text-gray-700 mb-2">Protein (g)</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded"
                name="protein"
                placeholder="Protein content"
                min="0"
                required
              />
            </div>

            {/* Carbs */}
            <div>
              <label className="block text-gray-700 mb-2">Carbs (g)</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded"
                name="carbs"
                placeholder="Carbs content"
                min="0"
                required
              />
            </div>

            {/* Fat */}
            <div>
              <label className="block text-gray-700 mb-2">Fat (g)</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded"
                name="fat"
                placeholder="Fat content"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        {/* Description and Ingredients Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Details</h2>
          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded"
              name="description"
              placeholder="Enter food description"
              rows="4"
              required
            />
          </div>

          {/* Ingredients */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Ingredients (comma separated)
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded"
              name="ingredients"
              placeholder="e.g., Lettuce, Cucumber, Tomatoes"
              required
            />
          </div>

          {/* Making Procedure */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Making Procedure</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded"
              name="makingProcedure"
              placeholder="Enter making procedure"
              rows="4"
              required
            />
          </div>

          {/* Vegetarian Checkbox */}
          <div className="mb-4">
            <label className="inline-flex items-center text-gray-700">
              <input
                type="checkbox"
                name="isVegetarian"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Is Vegetarian?</span>
            </label>
          </div>
        </div>

        {/* Added By Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Added By</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="addedByName"
                defaultValue={user?.displayName}
                className="w-full p-3 border border-gray-300 rounded bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="addedByEmail"
                defaultValue={user?.email}
                className="w-full p-3 border border-gray-300 rounded bg-gray-100"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Food Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;