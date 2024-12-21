import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create JWT token on auth state change
    const createJWT = async (currentUser) => {
        if (currentUser) {
            try {
                await axios.post('http://localhost:5000/jwt', 
                    { email: currentUser.email },
                    { withCredentials: true }
                );
            } catch (error) {
                console.error('Error creating JWT:', error);
            }
        }
    };

    // Observer for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (loggedUser) => {
            setUser(loggedUser);
            if (loggedUser) {
                await createJWT(loggedUser);
                console.log('User signed in:', loggedUser);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logOut = async () => {
        setLoading(true);
        try {
            // Clear the cookie on the server
            await axios.post('http://localhost:5000/logout', {}, 
                { withCredentials: true }
            );
            await signOut(auth);
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setLoading(false);
        }
    };

    // Rest of your auth methods remain the same
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        loginUser,
        signInWithGoogle,
        logOut,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;