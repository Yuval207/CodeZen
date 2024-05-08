import React from "react";
import { NavLink } from "react-router-dom";

const Signup = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-4xl font-bold mb-8">Signup</h1>
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
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <polyline points="3 7 12 13 21 7" />
          </svg>
          <input
            type="text"
            className="w-full p-2 bg-gray-800 border-b border-gray-500 text-white focus:outline-none focus:border-blue-500 rounded-md"
            placeholder="Email"
          />
        </div>
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
        <div className="mb-8 flex items-center">
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <input
            type="password"
            className="w-full p-2 bg-gray-800 border-b border-gray-500 text-white focus:outline-none focus:border-blue-500 rounded-md"
            placeholder="Confirm Password"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-2xl w-full">
          Sign up
        </button>
        <p className="mt-8 text-sm text-gray-300">
          Already have an account?{" "}
          <NavLink to={"/signin"}>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Sign In
            </a>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
