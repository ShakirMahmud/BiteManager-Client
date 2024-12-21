import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
    const [isClicked, setIsClicked] = useState(true);
    const { loginUser, setUser, signInWithGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

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

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then((result) => {
                setUser(result.user);
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
        <div>
            <div className="card bg-white w-full max-w-xl mx-auto p-6 rounded-xl shrink-0 shadow-2xl">
                <form onSubmit={handleSignIn} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type={isClicked ? 'password' : 'text'} name='password' placeholder="password" className="input rounded-xl input-bordered" required />
                        <button type='button' onClick={() => setIsClicked(!isClicked)} className="absolute right-5 top-[3rem] text-2xl text-gray-700">
                            {isClicked ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                        </button>
                        <label>
                            <Link to='/auth/forgetPassword' className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button type='submit' className="btn btn-primary bg-btn_bg rounded-xl text-white">Login</button>
                    </div>
                </form>
                <div className="text-center mt-6">
                    <span className="label-text">Don't have an account yet? </span>
                    <Link to='/Register' className="link link-hover">Sign Up</Link>
                </div>
                <div className="w-full flex justify-center py-6">
                    <button
                        onClick={handleSignInWithGoogle}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-gray-600 rounded-lg shadow hover:shadow-md transition-all duration-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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