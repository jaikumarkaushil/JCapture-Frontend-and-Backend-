import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import LOGIN from "../graphql/LOGIN";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [login, { loading, error }] = useMutation(LOGIN, {
        variables: {
            email: email,
            password: password,
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        login({
            onCompleted: (data) => {
                localStorage.setItem("token", data.authUser.token);
                navigate("/");
            }
        });
    };

    return (
        <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
            <div className="flex flex-column">
                <div className="pr-10 hidden md:flex items-center">
                    <img src="/images/react-insta.png" width="550" alt="phone-img" />
                </div>
                <div>
                    <div className="bg-white border border-gray-300 w-80 pt-10 pb-40 flex items-center flex-col mb-3 relative">
                        <img src="/images/JaiInsta-logo.png" width="200" height="100" alt="logo-img" />
                        <form
                            className="mt-8 w-64 flex flex-col"
                            onSubmit={handleSubmit}
                        >
                            <input
                                autoFocus
                                className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                                placeholder="Email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                autoFocus
                                className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="text-sm text-center bg-blue-300 hover:bg-blue-700 text-white py-1 rounded font-medium"
                            >
                                {loading ? "Signing in. Please Wait!" : "Sign in"}
                            </button>
                        </form>
                        <div className="text-center mt-5">
                            {loading && <span className="my-3">Loading may take a moment as we rely on free resources. Your patience is appreciated.</span>}
                            <p>Demo Account Credentials</p>
                            <p className="mt-3">Email: demo.user@gmail.com</p>
                            <p>Password: Demouser@1</p>
                            <p className="mt-3">OR</p>
                            <p className="mt-3">Click on
                                <a href="register" className="text-blue-500 text-sm font-semibold ml-1 cursor-pointer">
                                    Sign up
                                </a>
                                <br /> to create your own account
                            </p>

                        </div>

                        <div
                            className={`text-sm text-center text-red-500 absolute bottom-20 px-6 ${error ? "" : "hidden"
                                }`}
                        >
                            You have entered wrong credentials. Please try again!
                        </div>
                    </div>
                    <div className="bg-white border border-gray-300 text-center w-80 py-4">
                        <span className="text-sm">Don't have an account?</span>
                        <a href="register" className="text-blue-500 text-sm font-semibold ml-1 cursor-pointer">
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
