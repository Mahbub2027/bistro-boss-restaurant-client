import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBook,  FaDollarSign,  FaTruck, FaUsers } from "react-icons/fa";

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin-stats`)
            return res.data;
        }
    })

    return (
        <div className="w-11/12 mx-auto my-8">
            <h2 className="text-3xl">
                <span>Hi, Welcome </span>
                {
                    user?.displayName ? user?.displayName : 'Back'
                }

            </h2>
            <div className="w-full stats stats-vertical lg:stats-horizontal shadow">

                <div className="stat place-items-center space-y-2">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className="text-3xl"></FaDollarSign>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">{stats?.revenue}</div>
                    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                </div>

                <div className="stat place-items-center">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl"></FaUsers>
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">{stats?.users}</div>
                    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                </div>

                <div className="stat place-items-center">
                    <div className="stat-figure text-secondary">
                        <FaBook className="text-3xl"></FaBook>
                        
                    </div>
                    <div className="stat-title">Products</div>
                    <div className="stat-value">{stats?.menuItem}</div>
                    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                </div>

                <div className="stat place-items-center">
                    <div className="stat-figure text-secondary">
                        <FaTruck className="text-3xl"></FaTruck>
                    </div>
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">{stats?.orders}</div>
                    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                </div>

                

            </div>
        </div>
    );
};

export default AdminHome;