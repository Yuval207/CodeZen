import React from "react";
import Button from "./Button";
import { NavLink } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="h-20 px-10  font-mono flex p-6 items-center sticky top-0 z-50">
      <p className="text-white text-4xl font-bold">CodeZen</p>
      <div className="flex w-full items-center justify-center">
        <NavLink to={"/"}>
          <button className="text-white mx-4 hover:text-blue-300 text-lg">
            Home
          </button>
        </NavLink>
        <NavLink to={"/problems"}>
          <button className="text-white mx-4 hover:text-blue-300 text-lg">
            Problems
          </button>
        </NavLink>
        <button className="text-white mx-4 hover:text-blue-300 text-lg">
          About Us
        </button>
      </div>
      <div className="flex items-center justify-center">
        <NavLink to={"/signin"}>
          <button className="text-white mx-4 hover:text-blue-300 text-lg">
            Login
          </button>
        </NavLink>
        <NavLink to={"/signup"}>
          <Button btnText="Sign Up" />
        </NavLink>
      </div>
    </div>
  );
};

export default Topbar;
