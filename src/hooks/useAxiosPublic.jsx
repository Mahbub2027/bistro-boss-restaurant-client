import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://bistro-boss-restaurant-server-ten.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;