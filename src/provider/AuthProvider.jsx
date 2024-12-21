import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // update user
    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    }

    // login user
    const loginUser = () => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //sign in with google
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    // logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    


    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        loginUser,
        signInWithGoogle,
        logOut,
        updateUserProfile,
    }
    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(loggedUser) => {
            setUser(loggedUser);
            setLoading(false);
            console.log(loggedUser);
        });
        return () => {
            unsubscribe();
        }
    }, [])
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;