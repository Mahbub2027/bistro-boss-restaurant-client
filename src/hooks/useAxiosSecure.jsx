import axios from "axios";
import {  useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

 const axiosSecure =  axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useContext(AuthContext)
    // axios interceptors 
    // add request intercept 
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        console.log('request for response', token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, 
    function (error) {
        // Do something with request error
        return Promise.reject(error);
      });

      // add  response intercept
      axiosSecure.interceptors.response.use(function(response){
        return response;
      }, async (error) => {
        const status = error.response.status;
        console.log('status error in the response', status)
        if(status === 401 || status === 403){
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error);
      });


    return axiosSecure;
};

export default useAxiosSecure;