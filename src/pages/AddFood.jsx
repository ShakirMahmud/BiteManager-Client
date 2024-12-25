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

  const inputClassName = "input input-bordered border-2 border-light-background dark:border-dark-background text-light-text-primary dark:text-dark-text-primary w-full bg-light-background dark:bg-dark-card focus:border-btn_color dark:focus:border-dark-primary transition-all duration-300";
  const sectionClassName = "card bg-light-card dark:bg-dark-card shadow-lg hover:shadow-xl transition-all duration-300";
  const labelClassName = "text-light-text-primary dark:text-dark-text-primary font-medium";

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-background to-light-card dark:from-dark-background dark:to-dark-card p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-light-text-primary dark:text-dark-text-primary">
          Add New Food Item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className={sectionClassName}>
            <div className="card-body">
              <h2 className="card-title text-btn_color dark:text-dark-primary mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className={labelClassName}>Food Name</label>
                  <input type="text" name="foodName" className={inputClassName} required />
                </div>
                <div className="form-control">
                  <label className={labelClassName}>Food Image URL</label>
                  <input type="text" name="foodImage" className={inputClassName} required />
                </div>
                <div className="form-control">
                  <label className={labelClassName}>Food Category</label>
                  <input type="text" name="foodCategory" className={inputClassName} required />
                </div>
                <div className="form-control">
                  <label className={labelClassName}>Food Origin</label>
                  <input type="text" name="foodOrigin" className={inputClassName} required />
                </div>
              </div>
            </div>
          </div>

          {/* Quantity and Price */}
          <div className={sectionClassName}>
            <div className="card-body">
              <h2 className="card-title text-btn_color dark:text-dark-primary mb-4">Quantity and Price</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="form-control">
                  <label className={labelClassName}>Quantity</label>
                  <input type="number" name="quantity" min="0" className={inputClassName} required />
                </div>
                <div className="form-control">
                  <label className={labelClassName}>Price</label>
                  <input type="number" name="price" min="0" className={inputClassName} required />
                </div>
                <div className="form-control">
                  <label className={labelClassName}>Preparation Time</label>
                  <input type="text" name="preparationTime" className={inputClassName} required />
                </div>
              </div>
            </div>
          </div>

          {/* Nutrition Facts */}
          <div className={sectionClassName}>
            <div className="card-body">
              <h2 className="card-title text-btn_color dark:text-dark-primary mb-4">Nutrition Facts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="form-control">
                  <label className={labelClassName}>Calories</label>
                  <input type="number" name="calories" min="0" className={inputClassName} required />
                </div>
                <div className="form-control">
                  <label className={labelClassName}>Protein (g)</label>
                  <input type="number" name="protein" min="0" className={inputClassName} required />
                </div>
                <div className="form-control">
                  <label className={labelClassName}>Carbs (g)</label>
                  <input type="number" name="carbs" min="0" className={inputClassName} required />
                </div>
                <div className="form-control">
                  <label className={labelClassName}>Fat (g)</label>
                  <input type="number" name="fat" min="0" className={inputClassName} required />
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className={sectionClassName}>
            <div className="card-body">
              <h2 className="card-title text-btn_color dark:text-dark-primary mb-4">Details</h2>
              <div className="space-y-6">
                <div className="form-control">
                  <label className={labelClassName}>Description</label>
                  <textarea name="description" className={`${inputClassName} min-h-[100px]`} required />
                </div>
                <div className="form-control">
                  <label className={labelClassName}>Ingredients (comma separated)</label>
                  <input type="text" name="ingredients" className={inputClassName} required />
                </div>
                <div className="form-control">
                  <label className={labelClassName}>Making Procedure</label>
                  <textarea name="makingProcedure" className={`${inputClassName} min-h-[100px]`} required />
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" name="isVegetarian" className="checkbox checkbox-primary" />
                    <span className={labelClassName}>Is Vegetarian?</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Added By */}
          <div className={sectionClassName}>
            <div className="card-body">
              <h2 className="card-title text-btn_color dark:text-dark-primary mb-4">Added By</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className={labelClassName}>Name</label>
                  <input 
                    type="text" 
                    name="addedByName" 
                    defaultValue={user?.displayName} 
                    className={`${inputClassName} bg-gray-100 dark:bg-gray-700`} 
                    readOnly 
                  />
                </div>
                <div className="form-control">
                  <label className={labelClassName}>Email</label>
                  <input 
                    type="email" 
                    name="addedByEmail" 
                    defaultValue={user?.email} 
                    className={`${inputClassName} bg-gray-100 dark:bg-gray-700`} 
                    readOnly 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="btn btn-lg bg-btn_color hover:bg-opacity-90 text-white dark:bg-dark-primary w-full md:w-auto px-12"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Add Food Item"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;