import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosPublic from "../hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../pages/Loading";
import { Helmet } from "react-helmet-async";

const fetchFoodById = async (id) => {
  window.scrollTo(0, 0);
  const response = await axiosPublic.get(`/food/${id}`);
  return response.data;
};

const SingleFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: food, isLoading, isError } = useQuery({
    queryKey: ["food", id], // queryKey
    queryFn: () => fetchFoodById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-light-background dark:bg-dark-background min-h-screen py-8">
      <Helmet>
        <title>{food.foodName} - BiteManager</title>
      </Helmet>
      <div className="w-4/5 mx-auto px-4 lg:px-8">
        {/* Food Details Section */}
        <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-xl p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Food Image */}
            <div className="w-full lg:w-2/3 flex justify-center">
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="rounded-xl shadow-lg object-contain max-h-96 w-full"
              />
            </div>

            {/* Food Information */}
            <div className="flex-1 text-light-text-primary dark:text-dark-text-primary">
              <h1 className="text-3xl font-extrabold mb-4">{food.foodName}</h1>
              <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
                {food.foodCategory}
              </p>
              <p className="text-md text-light-text-muted dark:text-dark-text-muted">
                Origin: {food.foodOrigin}
              </p>
              <p className="text-lg font-semibold text-light-primary dark:text-dark-primary mt-4">
                Price: ${food.price}
              </p>
              <p className="text-md text-light-text-muted dark:text-dark-text-muted">
                Quantity Available: {food.quantity}
              </p>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-light-text-muted dark:text-dark-text-muted">
                  {food.description}
                </p>
              </div>

              {/* Ingredients */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
                <ul className="list-disc list-inside text-light-text-muted dark:text-dark-text-muted">
                  {food.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              {/* Making Procedure */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Making Procedure</h3>
                <p className="text-light-text-muted dark:text-dark-text-muted">
                  {food.makingProcedure}
                </p>
              </div>

              {/* Nutrition Facts */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Nutrition Facts</h3>
                <ul className="text-light-text-muted dark:text-dark-text-muted">
                  <li>Calories: {food.nutritionFacts.calories}</li>
                  <li>Protein: {food.nutritionFacts.protein}g</li>
                  <li>Carbs: {food.nutritionFacts.carbs}g</li>
                  <li>Fat: {food.nutritionFacts.fat}g</li>
                </ul>
              </div>

              {/* Preparation Time */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Preparation Time</h3>
                <p className="text-light-text-muted dark:text-dark-text-muted">
                  {food.preparationTime}
                </p>
              </div>

              {/* Vegetarian Status */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Vegetarian</h3>
                <p className="text-light-text-muted dark:text-dark-text-muted">
                  {food.isVegetarian ? "Yes" : "No"}
                </p>
              </div>

              {/* Added By */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Added By</h3>
                <p className="text-light-text-muted dark:text-dark-text-muted">
                  {food.addedBy.email}
                </p>
              </div>

              {/* Purchase Info */}
              <div className="flex flex-wrap items-center justify-between mt-8">
                <div className="text-light-text-secondary dark:text-dark-text-secondary">
                  <h3 className="text-xl font-semibold">Purchase Count</h3>
                  <p>{food.purchaseCount} purchases this month</p>
                </div>
                <button
                  onClick={() => navigate(`/checkout/${food._id}`)}
                  className="mt-4 lg:mt-0 px-6 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-full hover:bg-light-accent dark:hover:bg-dark-accent transition-all"
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
