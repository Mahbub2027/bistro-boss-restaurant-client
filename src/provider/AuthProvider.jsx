import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";

const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = ()=>{
        setLoading(true);
        return signOut(auth);
    }
    

    const updateUserProfile = (name, photo)=>{
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            console.log("current user: ", currentUser);
            setLoading(false);
        })
        return()=>{
            return unSubscribe();
        }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        logOut,
        updateUserProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;