import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = id =>{
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

                axiosSecure.delete(`/carts/${id}`)
                .then(result=> {
                    // console.log(result)
                    if(result.data.deletedCount > 0){
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
        <div className="my-10">
            <SectionTitle subtitles='My cart' headings='WANNA ADD MORE?'></SectionTitle>
            <div className="flex justify-around text-4xl">
                <h2>Total Order: {cart.length}</h2>
                <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
                <button className="btn btn-warning">Pay</button>
            </div>


            <div className="overflow-x-auto mb-10">
                <table className="table">
                    {/* head */}
                    <thead className="text-lg text-black font-bold">
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart.map((item, index) =>
                                <tr key={item._id}>
                                    <th>
                                        {index +1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>{item.name}</p>
                                    </td>

                                    <td>$ {item.price}</td>
                                    <th>
                                        <button onClick={() => handleDeleteItem(item._id)}
                                         className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>


                </table>
            </div>


        </div>
    );
};

export default Cart;