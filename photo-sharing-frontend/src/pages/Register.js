import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import REGISTER from "../graphql/REGISTER";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState();

  const [register] = useMutation(REGISTER, {
    variables: {
      email: email,
      password: password,
      userName: userName,
      fullName: fullName,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await register();
      localStorage.setItem("token", data.authUser.token);
      navigate("/");
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="flex flex-column">
        <div className="pr-10 hidden md:block">
          <img src="/images/react-insta.jpg" width="300" alt="phone-img" />
        </div>
        <div>
          <div className="bg-white border border-gray-300 w-80 pt-10 pb-60 flex items-center flex-col mb-3 relative">
            <img src="/images/JaiInsta-logo.png" width="250" height="150" alt="logo-img" />
            <form
              className="mt-8 w-64 flex flex-col"
              onSubmit={handleSubmit}
            >
              <input
                autoFocus
                className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                placeholder="User Name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />

              <input
                autoFocus
                className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                placeholder="Full Name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
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
                className="text-sm text-center bg-blue-300 text-white py-1 rounded font-medium"
              >
                Sign Up
              </button>
            </form>
            <div
              className={`text-sm text-center text-red-500 absolute bottom-20 px-8 ${error ? "" : "hidden"
                }`}
            >
              You have entered wrong credentials. Please try again!
            </div>
          </div>
          <div className="bg-white border border-gray-300 text-center w-80 py-4">
            <span className="text-sm">Don't have an account?</span>
            <a href="login" className="text-blue-500 text-sm font-semibold ml-1 cursor-pointer">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
