import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit ,reset} = useForm()
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
            const menuRes = await axiosSecure.post('/menu', menuItem)
            console.log(menuRes,data);
            if (menuRes.data.insertedId) {
                //
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        }
        console.log(res.data);

    }

    return (
        <div className="my-12">
            <SectionTitle headings='add an items' subtitles="What's new?"></SectionTitle>
            {/* <h2>Add Items</h2> */}
            <div className="w-10/12 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input {...register("name")}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full " />

                    </label>
                    <div className="flex gap-5 my-6">
                        {/* Category */}
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select defaultValue='default' {...register("category")}
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
                                type="number"
                                placeholder="Price"
                                className="input input-bordered w-full " />

                        </label>
                    </div>

                    {/* about Recipe details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                    </label>

                    {/* File input */}
                    <div>
                        <input {...register('image')} type="file" className="file-input file-input-bordered my-6 w-full max-w-xs" />
                    </div>

                    <button className="btn">
                        Add Item <FaUtensils className="ml-4"></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;