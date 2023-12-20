import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SocialLogin from "../../../components/SocialLinks/SocialLogin";

const Signup = () => {
    const axiosPublic = useAxiosPublic();
    const {createUser, updateUserProfile} = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data)
 
        createUser(data.email, data.password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);

            updateUserProfile(data.name, data.photo)
            .then(()=>{
                // create users for database
                const userInfo = {
                    name: data.name,
                    email: data.email
                }
                axiosPublic.post('/users', userInfo)
                .then(res=> {
                    if(res.data.insertedId){
                        console.log("user data entered in database")
                        reset();
                        navigate('/');
                    }
                })
            })
            .catch(error=>console.log(error))

            
        })
        .catch(error=>{
            console.log(error)
        })

    };


    return (
        <>
        <Helmet>
            <title>Bistro boss | Sign up</title>
        </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-full md:w-1/2 text-center lg:text-left">
                        <h1 className="text-5xl font-bold">SignUp now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Enter your name" className="input input-bordered" />
                                {errors.name && <span className="text-red-500">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="Enter your email" className="input input-bordered" />
                                {errors.email && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="text" {...register("photo", { required: true })} name="photo" placeholder=" photo url" className="input input-bordered" />
                                {errors.photo && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className="text-red-500">Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be 6 character</span>}
                                {errors.password?.type === 'maxLength' && <span className="text-red-500">Password must be less than 20 charaterr</span>}
                                {errors.password?.type === 'pattern' && <p
                                    className="text-red-500">Password must be one capital letter, one small letter,
                                    one number & one special character</p>}
                            </div>

                            <div className="form-control mt-6">
                                <input type="submit" value='Register' className="btn btn-primary text-base text-white" />
                            </div>
                            <SocialLogin></SocialLogin>

                            <p>Already have an account? Please <Link to='/login' className='text-orange-500 font-bold'>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;