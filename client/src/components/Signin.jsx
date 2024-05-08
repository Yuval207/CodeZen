import React from "react";
import { NavLink } from "react-router-dom";

const Signin = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-4xl font-bold mb-8">Signin</h1>
        <div className="mb-6 flex items-center">
          <svg
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <input
            type="text"
            className="w-full p-2 bg-gray-800 border-b border-gray-500 text-white focus:outline-none focus:border-blue-500 rounded-md"
            placeholder="Username"
          />
        </div>
        <div className="mb-6 flex items-center">
          <svg
            className="h-6 w-6 text-blue-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <circle cx="12" cy="16" r="1" />
            <path d="M8 11v-5a4 4 0 0 1 8 0" />
          </svg>
          <input
            type="password"
            className="w-full p-2 bg-gray-800 border-b border-gray-500 text-white focus:outline-none focus:border-blue-500 rounded-md"
            placeholder="Password"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-2xl w-full">
          Sign In
        </button>
        <p className="mt-8 text-sm text-gray-300">
          Don't have an account?{" "}
          <NavLink to={"/signup"}>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Sign up
            </a>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signin;
