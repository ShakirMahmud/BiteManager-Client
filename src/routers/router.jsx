import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from './../pages/ErrorPage';
import HomeLayout from "../layout/HomeLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
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
            {},
            {},
            {},
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