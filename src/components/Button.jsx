import React from "react";

const Button = ({ btnText = "click me →" }) => {
  return (
    <button className="text-black bg-blue-300 p-2 m-2 rounded-lg w-32 hover:bg-blue-200 font-semibold">
      {btnText}
    </button>
  );
};

export default Button;
