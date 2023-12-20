import {  useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const {googleLogin} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleLogin = ()=>{
        googleLogin()
        .then(res=> {
            console.log(res.user);
            const userInfo = {
                email: res.user.email,
                name: res.user.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res=>{
                console.log(res.data)
                navigate('/');
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <div>
            <div className="divider">Or</div>
            <button onClick={handleGoogleLogin} className="btn bg-white w-full border-2 border-orange-400 rounded-lg text-base"><FaGoogle></FaGoogle> Google</button>
        </div>
    );
};

export default SocialLogin;