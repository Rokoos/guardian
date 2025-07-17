import { useContext, useState } from "react";
import arrowRight from "../../assets/icons/arrow-right.svg";
import { UserContext } from "../../context/UserContext";

import Button from "../Button";
import { toast } from "react-toastify";
import { forgotPassword } from "../../api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { setIsLoading } = useContext(UserContext);

  const handleForgotPassword = () => {
    setIsLoading(true);

    forgotPassword(email)
      .then((res) => {
        console.log("res", res);
        toast.success(res.data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsLoading(false);
      });

    setEmail("");
  };
  return (
    <div
      className="  h-[100vh]  w-[70%] mx-auto flex 
    flex-col justify-center items-center"
    >
      <h2 className="mb-4 text-coral-red text-3xl font-bold">
        Forgot Password
      </h2>
      <label
        htmlFor="email"
        className=" block text-sm font-bold leading-6 text-coral-red"
      >
        Provide Email
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red text-sm sm:leading-6"
          placeholder="janeDoe@test.com"
        />
      </div>
      <div onClick={handleForgotPassword}>
        <Button label="Send" btnStyle="mt-10" iconUrl={arrowRight} />
      </div>
    </div>
  );
};

export default ForgotPassword;
