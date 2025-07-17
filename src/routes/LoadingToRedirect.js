import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && navigate("/");
    // cleanup
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <>
      <div className="w-[100vw] mt-5  flex justify-center items-center mb-[100px]">
        <p>Redirecting you in {count} seconds</p>
      </div>
    </>
  );
};

export default LoadingToRedirect;
