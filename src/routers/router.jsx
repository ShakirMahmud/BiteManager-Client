import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from './../pages/ErrorPage';
import HomeLayout from "../layout/HomeLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllFoods from "../pages/AllFoods";
import Gallery from "../pages/Gallery";
import PrivateRoute from "./PrivateRoute";
import AddFood from './../pages/AddFood';
export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: '/allFoods',
                element: <AllFoods/>
            },
            {
                path: '/gallery',
                element: <Gallery/>
            },
            {
                path: '/addFood',
                element: <PrivateRoute><AddFood/></PrivateRoute>
            },
            {},
            {},
            {},
            {},
            {},
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
        ]
    }
])