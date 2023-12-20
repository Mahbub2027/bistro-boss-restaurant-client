import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";


const AdminRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    const [isAdmin, isAdminLoading] = useAdmin();

    if(loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to='/login' state={{form: location}} replace></Navigate>
};

export default AdminRoutes;