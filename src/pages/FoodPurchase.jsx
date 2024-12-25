import { useParams, useNavigate } from "react-router-dom";
import Loading from "../pages/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './../hooks/useAxiosSecure';
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet-async";
import MapPicker from "../components/MapPicker";

const fetchFoodById = async (id, axiosSecure) => {
    window.scrollTo(0, 0);
    const response = await axiosSecure.get(`/food/${id}`);
    return response.data;
};

const FoodPurchase = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [selectedLocation, setSelectedLocation] = useState({
        lat: null,
        lng: null,
        address: "",
    });

    const handleLocationChange = (location) => {
        setSelectedLocation(location);
    };


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
        if (action === 'increment') {
            if (quantityToBuy < food.quantity) {
                setQuantityToBuy(quantityToBuy + 1);
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Limit Reached',
                    text: `You can only purchase up to ${food.quantity} items.`,
                    toast: true,
                    position: 'top-end',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } else if (action === 'decrement') {
            if (quantityToBuy > 1) {
                setQuantityToBuy(quantityToBuy - 1);
            }
        }
    };


    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }

    if (!food) {
        return <div className="text-red-500">No food data found!</div>;
    }

    const isOwnFood = food.addedBy.email === user.email;
    const isOutOfStock = food.quantity === 0;

    return (
        <div className="bg-light-background dark:bg-dark-background px-4 py-8">
            <Helmet>
                <title>Purchase - BiteManager</title>
            </Helmet>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-4/5 mx-auto  bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg">
                {/* Left Section: Food Details */}
                <div>
                    <img src={food.foodImage} alt={food.foodName} className="w-full lg:h-96 object-contain rounded-lg" />
                    <h2 className="text-2xl mt-4 text-light-text-primary dark:text-dark-text-primary">{food.foodName}</h2>
                    <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">{food.foodCategory}</p>
                    <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">Price: ${food.price}</p>
                    <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">Quantity Available: {food.quantity}</p>
                    <p className="text-md mt-2 text-light-text-muted dark:text-dark-text-muted">{food.description}</p>
                </div>

                {/* Right Section: Purchase Form */}
                <div className="lg:p-6 bg-white dark:bg-dark-card rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">Purchase Food</h3>

                    <div className="mb-4">
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">Buyer Name: <span className="font-semibold">{user.displayName}</span></p>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">Buyer Email: <span className="font-semibold">{user.email}</span></p>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={() => handleQuantityChange('decrement')}
                            className="px-4 py-2 bg-light-secondary dark:bg-dark-secondary text-white rounded-lg"
                            disabled={quantityToBuy === 1}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            value={quantityToBuy}
                            readOnly
                            className="text-center w-16 border border-light-text-muted dark:border-dark-text-muted rounded-lg"
                        />
                        <button
                            onClick={() => handleQuantityChange('increment')}
                            className="px-4 py-2 bg-light-secondary dark:bg-dark-secondary text-white rounded-lg"
                        // disabled={quantityToBuy === food.quantity}
                        >
                            +
                        </button>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">Select Delivery Address</h3>
                        <MapPicker onLocationChange={handleLocationChange} />
                        <div className="mt-4">
                            <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2 font-medium">Selected Address:</label>
                            <input
                                type="text"
                                value={selectedLocation.address}
                                readOnly
                                className="w-full px-3 py-2 border text-light-text-primary dark:text-dark-text-primary bg-light-card dark:bg-dark-card rounded-lg"
                            />
                        </div>
                    </div>


                    <button
                        onClick={handlePurchase}
                        className="w-full py-2 mt-4 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:bg-light-accent dark:hover:bg-dark-accent disabled:bg-gray-300"
                        disabled={isOutOfStock || isOwnFood || quantityToBuy <= 0}
                    >
                        {isOutOfStock
                            ? 'Out of Stock'
                            : isOwnFood
                                ? 'You cannot purchase your own food item.'
                                : 'Purchase'}

                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodPurchase;
