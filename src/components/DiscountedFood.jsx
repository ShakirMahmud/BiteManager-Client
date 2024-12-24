import { useQuery } from "@tanstack/react-query";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Link } from "react-router-dom";
import axiosPublic from "../hooks/axiosPublic";

const fetchDiscountedFoods = async () => {
  const response = await axiosPublic.get("/food/676adfd87ded4ce590463c39");
  return response.data;
};

const DiscountedFood = () => {
  const { data: discountedFood, isLoading, isError } = useQuery({
    queryKey: ["discountedFood"],
    queryFn: fetchDiscountedFoods,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading the data!</div>;

  const {
    foodName,
    foodImage,
    price,
    description,
    preparationTime,
    foodOrigin,
  } = discountedFood;

  const discountedPrice = (price * 0.9).toFixed(2); // Apply a 10% discount
  const dealDuration = 86400 * 10; // 24 hours in seconds

  return (
    <div className=" max-w-4xl mx-auto bg-light-background dark:bg-dark-background rounded-badge shadow-lg overflow-hidden">
      {/* Image and Timer Section */}
      <div className="relative">
        {/* Background Image */}
        <div
          className="relative w-full h-64 bg-cover bg-center rounded-t-lg"
          style={{
            backgroundImage: `url(${foodImage})`,
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-t-lg"></div>

          {/* Timer */}
          <div className="absolute inset-0 flex justify-center items-center">
            <CountdownCircleTimer
              isPlaying
              duration={dealDuration}
              colors={["#FF6B35", "#FF9F1C"]}
              colorsTime={[dealDuration, 0]}
            >
              {({ remainingTime }) => {
                const hours = Math.floor((remainingTime % 86400) / 3600);
                const minutes = Math.floor((remainingTime % 3600) / 60);
                const seconds = remainingTime % 60;
                return (
                  <div className="text-center text-white">
                    <div className="text-4xl font-bold">
                      {hours}:{minutes}:{seconds}
                    </div>
                    <div className="text-sm">Hrs : Min : Sec</div>
                  </div>
                );
              }}
            </CountdownCircleTimer>
          </div>
        </div>

        {/* Hot Deal Label */}
        <div className="absolute top-4 right-4 bg-orange-500 text-white py-1 px-3 rounded-lg text-sm font-bold">
          Today's Hot Deal
        </div>
      </div>

      {/* Food Details Section */}
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
          {foodName}
        </h2>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-2">
          {description}
        </p>
        <p className="text-sm text-light-text-muted dark:text-dark-text-muted mt-1">
          Preparation Time: {preparationTime} | Origin: {foodOrigin}
        </p>

        {/* Price */}
        <div className="mt-4 flex justify-center items-center space-x-2">
          <span className="text-xl text-gray-400 line-through">${price}</span>
          <span className="text-2xl font-bold text-orange-500">
            ${discountedPrice}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center items-center space-x-4">
          <Link
            to="/food/676adfd87ded4ce590463c39"
            className="text-sm font-semibold text-orange-500 underline"
          >
            View Info
          </Link>
          <Link to='/checkout/676adfd87ded4ce590463c39' className="bg-btn_color text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition">
            Order Deal!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiscountedFood;
