import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () =>{
        setLoading(true);
        return signInWithPopup(auth, provider);
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
            setUser(currentUser);
            if(currentUser) {
                
                const userInfo = { email : currentUser.email};
                axiosPublic.post('/jwt', userInfo)
                .then(res=> {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                    
                })
            }
            else {
                //
                localStorage.removeItem('access-token');
                setLoading(false);
            }

            // console.log("current user: ", currentUser);
            
        })
        return()=>{
            return unSubscribe();
        }
    },[axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        googleLogin,
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