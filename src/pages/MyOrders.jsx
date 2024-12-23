import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const fetchOrders = async (email, axiosSecure) => {
    const response = await axiosSecure.get(`/purchase?email=${email}`);
    return response.data;
};

const MyOrders = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: orders, isLoading, isError, error} = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: () => fetchOrders(user?.email, axiosSecure),
        enabled: !!user?.email
    })
    console.log(orders)
    return (
        <div>
            
        </div>
    );
};

export default MyOrders;