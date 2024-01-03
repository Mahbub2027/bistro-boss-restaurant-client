import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
    const { user } = useAuth();
    return (
        <div className="w-11/12 mx-auto my-8">
            <h2 className="text-3xl">
                <span>Hi, Welcome </span>
                    {
                        user?.displayName ? user.displayName : ' Back'
                    }
                
            </h2>
        </div>
    );
};

export default UserHome;