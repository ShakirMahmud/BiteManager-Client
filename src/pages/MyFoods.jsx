import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from './../hooks/useAxiosSecure';


const fetchFoodById = async (email, axiosSecure) => {
    const response = await axiosSecure.get(`/foods?email=${email}`);
    return response.data;
};

const MyFoods = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: foods, isLoading, isError, error } = useQuery({
        queryKey: ['food', user?.email],
        queryFn: () => fetchFoodById(user?.email, axiosSecure), 
        enabled: !!user?.email, 
    });
    console.log(foods)
    return (
        <div>
            
        </div>
    );
};

export default MyFoods;