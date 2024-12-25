import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./../pages/Loading";
import moment from "moment";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const fetchOrders = async (email, axiosSecure) => {
    window.scrollTo(0, 0);
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
            setOrders(data);
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
        return (
            <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background">
                <div className="text-error text-lg">Error: {error.message}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-light-background to-light-card dark:from-dark-background dark:to-dark-card p-4 md:p-8">
            <Helmet>
                <title>My Orders - BiteManager</title>
            </Helmet>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-light-text-primary dark:text-dark-text-primary">
                    My Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="text-center text-light-text-secondary dark:text-dark-text-secondary text-lg">
                        No orders found
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="card bg-light-card dark:bg-dark-card shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="card-body p-4">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="relative w-full sm:w-32 h-32">
                                            <img
                                                src={order.foodImage}
                                                alt={order.foodName}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                            <div className="absolute top-2 right-2">
                                                <div className="badge badge-primary">${order.price}</div>
                                            </div>
                                        </div>

                                        <div className="flex-1 space-y-2">
                                            <h2 className="card-title text-light-text-primary dark:text-dark-text-primary">
                                                {order.foodName}
                                            </h2>
                                            <div className="text-light-text-secondary dark:text-dark-text-secondary">
                                                <p className="flex items-center gap-2">
                                                    <span className="font-semibold">Owner:</span>
                                                    {order.foodOwner}
                                                </p>
                                                <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                                                    Ordered on: {moment(order.buyingDate).format("MMMM Do YYYY, h:mm a")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-actions justify-end mt-4">
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className="btn btn-error btn-sm text-white hover:bg-opacity-80 transition-colors duration-300"
                                        >
                                            Delete Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;