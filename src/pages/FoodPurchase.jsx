import { useParams, useNavigate } from "react-router-dom";
import Loading from "../pages/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './../hooks/useAxiosSecure'; 
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import Swal from 'sweetalert2'; 


const fetchFoodById = async (id, axiosSecure) => {
    const response = await axiosSecure.get(`/food/${id}`);
    return response.data;
};

const FoodPurchase = () => {
    const { id } = useParams();
    const { user } = useAuth(); 
    const axiosSecure = useAxiosSecure(); 
    const navigate = useNavigate(); 

    const { data: food, isLoading, isError, error } = useQuery({
        queryKey: ['food', id],
        queryFn: () => fetchFoodById(id, axiosSecure), 
        enabled: !!id, 
    });

    const [quantityToBuy, setQuantityToBuy] = useState(1);

    const handlePurchase = async () => {
        if (quantityToBuy <= 0 || quantityToBuy > food.quantity) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Quantity',
                text: `You can only purchase up to ${food.quantity} items.`,
            });
            return;
        }
        const purchaseData = {
            foodId: food._id,
            foodName: food.foodName,
            price: food.price,
            quantity: quantityToBuy,
            buyerName: user.displayName,
            buyerEmail: user.email,
            buyingDate: Date.now(),
        };
        
        try {
            // Store purchase in the database
            const response = await axiosSecure.post("/purchase", purchaseData);
            Swal.fire({
                icon: 'success',
                title: 'Purchase Successful!',
                text: `You have successfully purchased ${quantityToBuy} of ${food.foodName}.`,
            });
            navigate(`/food/${id}`); 
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Purchase Failed',
                text: `There was an error while purchasing the item. Please try again.`,
            });
        }
    };

    const handleQuantityChange = (action) => {
        if (action === 'increment' && quantityToBuy < food.quantity) {
            setQuantityToBuy(quantityToBuy + 1);
        } else if (action === 'decrement' && quantityToBuy > 1) {
            setQuantityToBuy(quantityToBuy - 1);
        }
    };

    if (isLoading) {
        return <Loading />; 
    }

    if (isError) {
        return <div>Error: {error.message}</div>; 
    }

    if (!food) {
        return <div>No food data found!</div>; 
    }

    // Disabling purchase if food is out of stock or if user tries to buy their own food
    const isOwnFood = food.addedBy.email === user.email;
    const isOutOfStock = food.quantity === 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Section: Food Details */}
            <div>
                <img src={food.foodImage} alt={food.foodName} className="w-full h-64 object-cover rounded-lg" />
                <h2 className="text-2xl mt-4">{food.foodName}</h2>
                <p className="text-lg">{food.foodCategory}</p>
                <p className="text-lg">Price: ${food.price}</p>
                <p className="text-lg">Quantity Available: {food.quantity}</p>
                <p className="text-md mt-2">{food.description}</p>
            </div>

            {/* Right Section: Purchase Form */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Purchase Food</h3>

                <div className="mb-4">
                    <p>Buyer Name: <span className="font-semibold">{user.displayName}</span></p>
                    <p>Buyer Email: <span className="font-semibold">{user.email}</span></p>
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <button
                        onClick={() => handleQuantityChange('decrement')}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                        disabled={quantityToBuy === 1}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={quantityToBuy}
                        readOnly
                        className="text-center w-16 border border-gray-300 rounded-lg"
                    />
                    <button
                        onClick={() => handleQuantityChange('increment')}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                        disabled={quantityToBuy === food.quantity}
                    >
                        +
                    </button>
                </div>

                {/* Purchase Button */}
                <button
                    onClick={handlePurchase}
                    className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
                    disabled={isOutOfStock || isOwnFood || quantityToBuy <= 0}
                >
                    {isOutOfStock ? 'Out of Stock' : 'Purchase'}
                </button>
                {isOwnFood && (
                    <p className="text-red-500 mt-2">You cannot purchase your own food item.</p>
                )}
                {isOutOfStock && (
                    <p className="text-red-500 mt-2">This item is out of stock.</p>
                )}
            </div>
        </div>
    );
};

export default FoodPurchase;
