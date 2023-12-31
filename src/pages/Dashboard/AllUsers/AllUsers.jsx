import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    //  use tanstack query
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const result = await axiosSecure.get('/users')
            return result.data;
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(result =>{
            console.log(result.data)
            if(result.data.modifiedCount > 0){
                refetch();
                Swal.fire({              
                    icon: "success",
                    title: `${user.email} is admin now`,
                    showConfirmButton: false,
                    timer: 1500, 
                })
            }
        })
    }

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(result => {
                        // console.log(result)
                        if (result.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })


            }
        });
    }

    return (
        <div className="mx-10 my-12">
            <div className="">
                <SectionTitle subtitles='How many?' headings='MANAGE ALL USERS'></SectionTitle>
                <h2 className="text-3xl px-5">Total Users: {users.length}</h2>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.plot === 'admin' ? 'Admin' : 
                                        <button onClick={()=> handleMakeAdmin(user)}> 
                                        <FaUser className="w-12 h-12 rounded-md bg-orange-400 text-white text-xl p-2 textw"></FaUser>
                                        </button>
                                    }
                                </td>
                                <td><button onClick={() => handleDeleteUser(user)}
                                    className="btn btn-active w-12  p-2 rounded-md text-white text-xl bg-red-500">
                                    <FaTrashAlt className=""></FaTrashAlt>
                                </button></td>
                            </tr>)
                        }
                        <tbody>
                            {/* row 1 */}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;