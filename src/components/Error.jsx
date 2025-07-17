import React from "react";
import { FaTriangleExclamation } from "react-icons/fa6";

const ErrorComponent = () => {
  return (
    <div className="w-full h-[100vh]  flex flex-col justify-center items-center text-coral-red ">
      <FaTriangleExclamation className=" h-20 w-20 mb-4" />
      <span className="font-bold md:text-2xl ">Oooops!!</span>
      <h2 className="font-bold md:text-2xl"> Something went wrong!</h2>
    </div>
  );
};

export default ErrorComponent;
