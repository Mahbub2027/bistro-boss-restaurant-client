import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    
    const { loginUser } = useContext(AuthContext);
    const [disabled, setDisabled] = useState(true);

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    // const captchaRef = useRef();
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleValidateCaptcha = e => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            // alert('Captcha Matched');
            setDisabled(false);
        }

        else {
            setDisabled(true)
            // alert('Captcha Does Not Match');
        }
    }


    const handleLogin = e => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        loginUser(email, password)
            .then(result => {
                console.log(result.user)
                 navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error)
            })
    }




    return (
        <>
        <Helmet>
            <title>Bistro boss | log in</title>
        </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-full md:w-1/2 text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha}  type="text" name="captcha" placeholder="Enter the captcha" className="input input-bordered" required />
                                {/* <button  className="btn btn-outline btn-xs mt-1">Validate captcha</button> */}
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disabled} type="submit" className="btn btn-primary" value='Login' />
                            </div>

                            <p>New here? Please <Link to='/signup' className='text-orange-500 font-bold'>Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;