import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const Register = () => {
    const [isClicked, setIsClicked] = useState(true);
    const [error, setError] = useState('');
    const { createUser, signInWithGoogle, updateUserProfile, setUser } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const sweetAlert = () => {
        Swal.fire({
            title: "Sign-Up Successful!",
            text: "You have successfully signed up. You will be redirected shortly, or click OK to proceed immediately.",
            icon: "success",
            confirmButtonText: "OK",
            timer: 3000,
            timerProgressBar: true,
        }).then((result) => {
            if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                navigate("/");
            }
        });
    };
    const postToDB = (newUser) => {
        axiosSecure.post('/users', newUser)
            .then(data => {
                if (data.data.insertedId) {
                    sweetAlert();
                }
            })
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        // validate user with one uppercase, one lowercase, and 6 characters
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isValidLength = password.length >= 6;

        if (!hasUppercase) {
            setError("Password must contain at least one uppercase letter.");
            return;
        }
        if (!hasLowercase) {
            setError("Password must contain at least one lowercase letter.");
            return;
        }
        if (!isValidLength) {
            setError("Password must be at least 6 characters long.");
            return;
        }


        createUser(email, password)
            .then((result) => {
                setUser(result.user);
                setError('');
                const user = { name, photo, email };
                postToDB(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        // sweetAlert();
                    })
                    .catch((error) => {
                        setError(error.message);
                    });
            })
            .catch((error) => {
                setError(error.message);
            });
    };


    const handleSignUpWithGoogle = () => {
        signInWithGoogle()
            .then((result) => {
                setUser(result.user);
                const user = { name: result.user.displayName, photo: result.user.photoURL, email: result.user.email };
                postToDB(user);
                sweetAlert();
            })
            .catch((error) => {
                setError(error.message);
            });

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background">
            <Helmet>
                <title>Register - BiteManager</title>
            </Helmet>
            <div className="card bg-light-card dark:bg-dark-card w-full max-w-xl mx-auto p-6 rounded-xl shadow-2xl">
                <form onSubmit={handleSignUp} className="card-body">
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text text-light-text-primary dark:text-dark-text-primary">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="your name"
                            className="input input-bordered rounded-lg bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary"
                            required
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text text-light-text-primary dark:text-dark-text-primary">Photo-URL</span>
                        </label>
                        <input
                            type="text"
                            name="photo"
                            placeholder="your photo-url"
                            className="input input-bordered rounded-lg bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary"
                            required
                        />
                    </div>
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
                        <label className="label">
                            <a
                                href="#"
                                className="label-text-alt link link-hover text-light-text-muted dark:text-dark-text-secondary"
                            >
                                Forgot password?
                            </a>
                        </label>
                    </div>
                    {error && <p className="text-error">{error}</p>}
                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="btn btn-primary bg-light-primary dark:bg-dark-primary text-white hover:bg-light-secondary dark:hover:bg-dark-secondary rounded-lg"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="text-center mt-6">
                    <span className="label-text text-light-text-secondary dark:text-dark-text-muted">
                        Already have an account?{' '}
                    </span>
                    <Link
                        to="/login"
                        className="link link-hover text-light-secondary dark:text-dark-secondary font-semibold"
                    >
                        Log In
                    </Link>
                </div>
                <div className="w-full flex justify-center py-6">
                    <button
                        onClick={handleSignUpWithGoogle}
                        className="flex items-center gap-2 px-6 py-3 bg-light-card dark:bg-dark-card text-light-text-secondary dark:text-dark-text-muted rounded-lg shadow hover:shadow-lg transition-all duration-300 border border-light-secondary dark:border-dark-secondary"
                    >
                        <FcGoogle size={24} />
                        <span className="text-lg font-medium">Sign Up with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );

};

export default Register;