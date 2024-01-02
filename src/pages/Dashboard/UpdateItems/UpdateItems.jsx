import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItems = () => {
    const {name, category, recipe, price, _id} = useLoaderData();
    // console.log(item);
    const { register, handleSubmit } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data)
        // first upload imageBB then get the url
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // send data to the server side for img url
            const menuItem = {
                name: data.name,
                category: data.category,
                recipe: data.recipe,
                price: parseFloat(data.price),
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
            console.log(menuRes.data);
            if (menuRes.data.modifiedCount > 0) {
                //
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        }
        console.log(res.data);

    }

    return (
        <div>
            <SectionTitle headings='update Item'></SectionTitle>
            <div className="w-10/12 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input {...register("name")}
                            type="text" defaultValue={name}
                            placeholder="Type here"
                            className="input input-bordered w-full " />

                    </label>
                    <div className="flex gap-5 my-6">
                        {/* Category */}
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select defaultValue={category} {...register("category")}
                                className="select select-bordered w-full ">
                                <option disabled value='default'>Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="desserts">Desserts</option>
                                <option value="drinks">Drinks</option>

                            </select>
                        </label>

                        {/* price */}
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input {...register("price")}
                                type="number" defaultValue={price}
                                
                                className="input input-bordered w-full " />

                        </label>
                    </div>

                    {/* about Recipe details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea {...register('recipe')} defaultValue={recipe}
                        className="textarea textarea-bordered h-24"></textarea>
                    </label>

                    {/* File input */}
                    <div>
                        <input {...register('image')} type="file" className="file-input file-input-bordered my-6 w-full max-w-xs" />
                    </div>

                    <button className="btn">
                        Update Item 
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItems;