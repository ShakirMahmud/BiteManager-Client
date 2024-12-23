import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./../pages/Loading";
import moment from "moment";
import Swal from "sweetalert2";

const fetchOrders = async (email, axiosSecure) => {
    const response = await axiosSecure.get(`/purchase?email=${email}`);
    return response.data;
};

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [orders, setOrders] = useState([]);

    const { isLoading, isError, error } = useQuery({
        queryKey: ["orders", user?.email],
        queryFn: async () => {
            const data = await fetchOrders(user?.email, axiosSecure);
            setOrders(data); // Store fetched orders in local state
            return data;
        },
        enabled: !!user?.email,
    });

    const handleDelete = async (orderId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/purchase/${orderId}`);
                    Swal.fire("Deleted!", "Order has been deleted.", "success");

                    // Update local state after deletion
                    setOrders((prevOrders) =>
                        prevOrders.filter((order) => order._id !== orderId)
                    );
                } catch (error) {
                    Swal.fire("Error", "Failed to delete the order.", "error");
                }
            }
        });
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="border p-4 rounded-lg shadow-lg flex flex-col justify-between"
                    >
                        {/* Food Image and Info */}
                        <div className="flex items-start space-x-4">
                            <img
                                src={order.foodImage}
                                alt={order.foodName}
                                className="w-24 h-24 object-cover rounded"
                            />
                            <div>
                                <h2 className="text-xl font-bold">{order.foodName}</h2>
                                <p className="text-gray-700">Price: ${order.price}</p>
                                <p className="text-gray-700">Owner: {order.foodOwner}</p>
                                <p className="text-gray-500 text-sm">
                                    Ordered on: {moment(order.buyingDate).format(
                                        "MMMM Do YYYY, h:mm:ss a"
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Delete Button */}
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => handleDelete(order._id)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
