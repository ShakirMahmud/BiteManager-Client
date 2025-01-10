import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const [isClicked, setIsClicked] = useState(true);
    const { loginUser, setUser, signInWithGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        loginUser(email, password)
            .then((result) => {
                setUser(result.user);
                Swal.fire({
                    title: "Sign-In Successful!",
                    text: "You have successfully signed in. You will be redirected shortly, or click OK to proceed immediately.",
                    icon: "success",
                    confirmButtonText: "OK",
                    timer: 3000,
                    timerProgressBar: true,
                })
                    .then((result) => {
                        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                            navigate(location?.state ? location?.state : '/');
                        }
                    })
            })
            .catch(() => {
                Swal.fire({
                    title: "Sign-In Failed!",
                    text: 'Wrong email or password',
                    icon: "error",
                    confirmButtonText: "Try Again",
                })
            })
    };
    const postToDB = (newUser) => {
        axiosSecure.post('/users', newUser)
            .then(data => {
                if (data.data.insertedId) {
                    console.log('User signed in:');
                }
            })
    };

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then((result) => {
                setUser(result.user);
                const user = { name: result.user.displayName, photo: result.user.photoURL, email: result.user.email };
                postToDB(user);
                Swal.fire({
                    title: "Sign-In with Google Successful!",
                    text: "You have successfully signed in using Google. You will be redirected shortly, or click OK to proceed immediately.",
                    icon: "success",
                    confirmButtonText: "OK",
                    timer: 3000,
                    timerProgressBar: true,
                }).then((result) => {
                    if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                        navigate(location?.state ? location?.state : '/');
                    }
                })
            })
            .catch((error) => {
                Swal.fire({
                    title: "Sign-In Failed!",
                    text: 'An error occurred while signing in with Google',
                    icon: "error",
                    confirmButtonText: "Try Again",
                })
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background">
            <Helmet>
                <title>Login - BiteManager</title>
            </Helmet>
            <div className="card bg-light-card dark:bg-dark-card w-full max-w-xl mx-auto p-6 rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300">
                    Sign in to continue to BiteManager
                </p>
                <form onSubmit={handleSignIn} className="card-body">
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text text-light-text-primary dark:text-dark-text-primary">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            className="input input-bordered rounded-lg bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary"
                            required
                        />
                    </div>
                    <div className="form-control relative mb-4">
                        <label className="label">
                            <span className="label-text text-light-text-primary dark:text-dark-text-primary">Password</span>
                        </label>
                        <input
                            type={isClicked ? 'password' : 'text'}
                            name="password"
                            placeholder="password"
                            className="input input-bordered rounded-lg bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setIsClicked(!isClicked)}
                            className="absolute right-5 top-[3rem] text-2xl text-light-text-secondary dark:text-dark-text-muted"
                        >
                            {isClicked ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                        </button>
                        <label>
                            <Link
                                to="/auth/forgetPassword"
                                className="label-text-alt link link-hover text-light-text-muted dark:text-dark-text-secondary"
                            >
                                Forgot password?
                            </Link>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="btn btn-primary bg-light-primary dark:bg-dark-primary text-white hover:bg-light-secondary dark:hover:bg-dark-secondary rounded-lg"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-center mt-6">
                    <span className="label-text text-light-text-secondary dark:text-dark-text-muted">
                        Don't have an account yet?{' '}
                    </span>
                    <Link to="/Register" className="link link-hover text-light-secondary dark:text-dark-secondary font-semibold">
                        Sign Up
                    </Link>
                </div>
                <div className="w-full flex justify-center py-6">
                    <button
                        onClick={handleSignInWithGoogle}
                        className="flex items-center gap-2 px-6 py-3 bg-light-card dark:bg-dark-card text-light-text-secondary dark:text-dark-text-muted rounded-lg shadow hover:shadow-lg transition-all duration-300 border border-light-secondary dark:border-dark-secondary"
                    >
                        <FcGoogle size={24} />
                        <span className="text-lg font-medium">Log In with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );

};

export default Login;