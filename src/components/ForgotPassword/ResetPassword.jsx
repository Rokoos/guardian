import { useState, useContext, useEffect } from "react";
import { resetPassword } from "../../api";
import Button from "../Button";
import { UserContext } from "../../context/UserContext";
import { GiConfirmed } from "react-icons/gi";
import arrowRight from "../../assets/icons/arrow-right.svg";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  // console.log("token", token);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setIsLoading } = useContext(UserContext);

  useEffect(() => {
    //Get the current url
    const params = new URLSearchParams(window.location.search);
    //Retrive the value of the token
    const str = params.get("token");
    setToken(str);
  }, []);

  const handleResetPassword = () => {
    setIsLoading(true);
    try {
      let data = { password, token };
      resetPassword(data)
        .then((res) => {
          console.log("res", res);
          toast.success(res.data.message);
          setPassword("");
          setConfirmPassword("");
        })
        .catch((e) => {
          console.log("error1", e);
          toast.error(e.response.data.message);
        });

      setIsLoading(false);
    } catch (error) {
      console.log("error2", error);
      setIsLoading(false);
    }
  };
  return (
    <div
      className="  h-[100vh]  w-[70%] mx-auto flex 
    flex-col justify-center items-center"
    >
      <h2 className="mb-2 text-coral-red text-3xl font-bold">Reset Password</h2>

      <label
        htmlFor="password"
        className="block text-sm font-bold leading-6 text-coral-red mt-2"
      >
        Password
      </label>
      <div className="relative mt-2 mb-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
          className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red text-sm sm:leading-6 "
          placeholder="Enter new password"
        />
      </div>
      <label
        htmlFor="password"
        className="block text-sm font-bold leading-6 text-coral-red mt-2"
      >
        Confirm Password
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
          className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red text-sm sm:leading-6 "
          placeholder="Confirm new password"
        />
      </div>
      {password.trim().length >= 6 &&
        password.trim() === confirmPassword.trim() && (
          <GiConfirmed className="h-6 w-6 text-green-700 mt-4" />
        )}
      <div onClick={handleResetPassword}>
        <Button
          label="Reset"
          btnStyle="mt-4"
          iconUrl={arrowRight}
          disabled={
            password.trim().length < 6 ||
            password.trim() !== confirmPassword.trim()
          }
        />
      </div>
    </div>
  );
};

export default ResetPassword;
