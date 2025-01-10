import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axiosPublic from '../hooks/axiosPublic';
import Loading from '../pages/Loading';
import img from '../assets/img1.jpeg'
import { Helmet } from 'react-helmet-async';

const AllFoods = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [foods, setFoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const itemsPerPage = 8;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        axiosPublic.get('/foodsCount')
            .then(response => {
                setCount(response.data.count);
            })
            .catch(error => {
                console.error('Error fetching count:', error);
            });
    }, []);

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()]

    useEffect(() => {
        const fetchFoods = async () => {
            setIsLoading(true);
            try {
                const response = await axiosPublic.get(`/foods?search=${searchQuery}&page=${currentPage - 1}&limit=${itemsPerPage}`);
                setFoods(response.data.foods);
                setCount(response.data.totalCount);
            } catch (error) {
                console.error('Error fetching foods:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFoods();
    }, [searchQuery, currentPage]);


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleSearchIconClick = () => {
        setSearchQuery(searchQuery);
    };


    return (
        <div className="min-h-screen py-12 bg-light-background dark:bg-dark-background transition-colors duration-300">
            <Helmet>
                <title>All Foods - BiteManager</title>
            </Helmet>
            {/* Title Section */}
            <div
                className="relative bg-cover bg-center h-80 flex flex-col items-center justify-center text-center px-4"
                style={{ backgroundImage: `url(${img})` }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>

                {/* Title */}
                <h1 className="relative text-5xl md:text-7xl font-bold text-dark-text-primary z-10">
                    Delicious Foods
                </h1>

                {/* Subtitle */}
                <p className="relative z-10 text-lg md:text-2xl font-semibold text-gray-200 mt-4">
                    Discover the Best Foods!
                </p>

                {/* Search Bar */}
                <div className="relative z-10 mt-6 flex items-center space-x-2 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search for foods..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full px-4 py-2 text-light-text-primary dark:text-dark-text-primary bg-light-card dark:bg-dark-card rounded-lg shadow-md outline-none transition-all duration-300 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                    />
                    <div
                        onClick={handleSearchIconClick}
                        className="p-2 bg-btn_color text-white rounded-full shadow-md hover:bg-light-accent dark:hover:bg-dark-accent transition-all"
                    >
                        <FiSearch size={20} />
                    </div>
                </div>
            </div>

            {/* Food Cards Section */}
            <div className="py-10 px-6 max-w-7xl mx-auto">
                {isLoading ? (
                    <Loading />
                ) : foods.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {foods.map((food) => (
                            <div
                                key={food._id}
                                className="bg-light-card dark:bg-dark-card shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                            >
                                <img
                                    src={food.foodImage}
                                    alt={food.foodName}
                                    className="w-full h-40 object-contain object-center bg-light-muted dark:bg-dark-muted"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                                        {food.foodName}
                                    </h3>
                                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                                        {food.foodCategory}
                                    </p>
                                    <p className="text-light-text-primary dark:text-dark-text-primary mt-2 font-medium">
                                        Quantity: {food.quantity}
                                    </p>
                                    <button
                                        className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                                        onClick={() => navigate(`/food/${food._id}`)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-light-text-muted dark:text-dark-text-muted text-lg">
                        No matching foods found.
                    </div>
                )}
            </div>

            {/* Pagination */}
            {/* Pagination */}
            <div className="flex flex-wrap justify-center items-center mt-6 gap-2">
                <button
                    className={`px-4 py-2 text-sm rounded-lg ${currentPage === 1
                        ? 'bg-light-muted text-light-text-muted cursor-not-allowed'
                        : 'bg-light-card dark:bg-dark-card text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary hover:text-white dark:hover:bg-dark-primary'
                        }`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                {pages.map((page) => (
                    <button
                        key={page}
                        className={`px-4 py-2 text-sm rounded-lg ${currentPage === page + 1
                            ? 'bg-light-primary text-white'
                            : 'bg-light-card dark:bg-dark-card text-light-text-primary dark:text-dark-text-primary hover:bg-light-secondary hover:text-white dark:hover:bg-dark-secondary'
                            }`}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        {page + 1}
                    </button>
                ))}
                <button
                    className={`px-4 py-2 text-sm rounded-lg ${currentPage === numberOfPages
                        ? 'bg-light-muted text-light-text-muted cursor-not-allowed'
                        : 'bg-light-card dark:bg-dark-card text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary hover:text-white dark:hover:bg-dark-primary'
                        }`}
                    disabled={currentPage === numberOfPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>

        </div>

    );
};

export default AllFoods;
