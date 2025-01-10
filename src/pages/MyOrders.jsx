import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./../pages/Loading";
import moment from "moment";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { motion } from 'framer-motion';

const fetchOrders = async (email, axiosSecure) => {
    window.scrollTo(0, 0);
    const response = await axiosSecure.get(`/purchase?email=${email}`);
    return response.data;
};

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [orders, setOrders] = useState([]);
    const [hasFetched, setHasFetched] = useState(false); 

    const { isLoading, isError, error } = useQuery({
        queryKey: ["orders", user?.email],
        queryFn: async () => {
            const data = await fetchOrders(user?.email, axiosSecure);
            setOrders(data);
            setHasFetched(true);  
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

    if (isLoading || !hasFetched) {
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
        <div className="min-h-screen bg-light-background dark:bg-dark-background p-4 md:p-8">
            <Helmet>
                <title>My Orders - BiteManager</title>
            </Helmet>
            <div className="max-w-6xl mx-auto">
                <motion.h1 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-center mb-12 text-light-text-primary dark:text-dark-text-primary"
                >
                    My Orders
                </motion.h1>
    
                {hasFetched && orders.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center"
                    >
                        <div className="bg-light-card dark:bg-dark-card p-8 rounded-xl shadow-lg">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-24 w-24 mx-auto mb-4 text-light-text-muted dark:text-dark-text-muted"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                                />
                            </svg>
                            <h2 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                                No Orders Yet
                            </h2>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                                Looks like you haven't placed any orders yet. 
                                Explore our menu and start your culinary journey!
                            </p>
                            <button
                                onClick={() => navigate('/all-foods')}
                                className="btn bg-light-primary dark:bg-dark-primary text-white hover:bg-light-secondary dark:hover:bg-dark-secondary"
                            >
                                Browse Foods
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    >
                        {orders.map((order) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="relative">
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            src={order.foodImage}
                                            alt={order.foodName}
                                            className="w-full h-64 object-contain"
                                        />
                                    </div>
                                    <div className="absolute top-4 right-4 bg-light-primary dark:bg-dark-primary text-white px-3 py-1 rounded-full text-sm">
                                        ${order.price}
                                    </div>
                                </div>
                                
                                <div className="p-6 flex flex-col">
                                    <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
                                        {order.foodName}
                                    </h2>
                                    
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary">
                                            <span className="mr-2">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5" 
                                                    viewBox="0 0 20 20" 
                                                    fill="currentColor"
                                                >
                                                    <path 
                                                        fillRule="evenodd" 
                                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                                                        clipRule="evenodd" 
                                                    />
                                                </svg>
                                            </span>
                                            {order.foodOwner}
                                        </div>
                                        <div className="flex items-center text-light-text-muted dark:text-dark-text-muted text-sm">
                                            <span className="mr-2">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5" 
                                                    viewBox="0 0 20 20" 
                                                    fill="currentColor"
                                                >
                                                    <path 
                                                        fillRule="evenodd" 
                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" 
                                                        clipRule="evenodd" 
                                                    />
                                                </svg>
                                            </span>
                                            {moment(order.buyingDate).format("MMMM Do YYYY, h:mm a")}
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={() => handleDelete(order._id)}
                                        className=" flex-grow w-full btn bg-light-primary dark:bg-dark-primary text-white hover:bg-light-secondary dark:hover:bg-dark-secondary"
                                    >
                                        Delete Order
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
