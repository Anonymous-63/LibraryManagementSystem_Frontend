import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FormInput } from '../../../components/ui/Input'
import { yupResolver } from "@hookform/resolvers/yup";
import { NotificationService } from "../../../services/NotificationService";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { login } from "../authSlice";
import googleImg from "@/assets/icons/google.png"
import githubImg from "@/assets/icons/github.png"

const schema = yup.object({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "admin@example.com",
            password: "admin123",
        },
    });

    const onFinish = async (values) => {
        try {
            const res = await dispatch(login(values)).unwrap();
            navigate("/dashboard");
        } catch (err) {
            NotificationService.success(err);
        }
    };

    const handleOAuthLogin = (provider) => {
        const baseApi = import.meta.env.VITE_API_URL;
        const redirectUri = `${window.location.origin}/oauth2/redirect`;
        window.location.href = `${baseApi}/oauth2/authorization/${provider}?redirect_uri=${encodeURIComponent(redirectUri)}`;
    };

    return (
        <>
            <div className="card card-border bg-base-100 w-96 shadow-md">
                <div className="card-body">
                    <h2 className="card-title text-xl mb-4">Login</h2>
                    <form onSubmit={handleSubmit(onFinish)}>
                        <FormInput
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            control={control}
                            errors={errors}
                        />
                        <FormInput
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            control={control}
                            errors={errors}
                        />
                        <label className="label mb-4">
                            <input type="checkbox" defaultChecked className="checkbox" />
                            Remember me
                        </label>
                        <div className="card-actions mb-4">
                            <button type='submit' className="btn btn-primary rounded-lg w-full">Sign in</button>
                        </div>
                        <div className="text-center">
                            <Link to="/forgot-password" className=" !text-gray-700 dark:!text-neutral-200 hover:!underline">
                                Forgot your password?
                            </Link>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <div className="flex flex-col gap-4">
                        {/* Google */}
                        <button onClick={() => handleOAuthLogin("google")} className="btn btn-outline rounded-lg">
                            <img src={googleImg} alt="Github" className="w-5 h-5" />
                            Login with Google
                        </button>

                        {/* GitHub */}
                        <button onClick={() => handleOAuthLogin("github")} className="btn btn-outline rounded-lg">
                            <img src={githubImg} alt="Github" className="w-5 h-5" />
                            Login with GitHub
                        </button>

                        <label className="self-center">
                            Don&apos;t have an account?{" "}
                            <Link strong to="/register" className="link link-primary link-hover">
                                Sign Up
                            </Link>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage