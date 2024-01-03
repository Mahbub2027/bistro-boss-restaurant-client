import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
// import axios from "axios";


const FoodCart = ({ item }) => {
    const { name, image, recipe, price, _id } = item;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [ , refetch] = useCart();


    const handleAddtoCart = food => {
        if (user && user.email) {
            // send to the database
            console.log(user.email, food)
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price,
            }

            // axios.post('https://bistro-boss-restaurant-server-ten.vercel.app/carts', cartItem)  [ axios only without using hooks]
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                   
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} is add to the cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch the cart 
                        refetch();
                    }
                })
        }
        else {
            Swal.fire({
                title: "You're not logged in!",
                text: "Please log in first",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, log in!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })

                }
            });
        }
    }
    return (
        <div className="card  bg-slate-200">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute right-4 top-4 p-1 bg-slate-900 text-white">${price}</p>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button onClick={() => handleAddtoCart(item)}
                        className="btn btn-outline border-0 border-b-4 bg-slate-100 border-orange-500">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCart;