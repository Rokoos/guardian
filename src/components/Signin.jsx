import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import arrowRight from "../assets/icons/arrow-right.svg";
import { signin } from "../api";
import Button from "./Button";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsLoading, setUser, setIsAuth, setIsAdmin } =
    useContext(UserContext);

  let navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    signin({ email, password })
      .then((res) => {
        toast.success(`Hello ${res.data.user.name}!`, {
          autoClose: 2000,
        });
        localStorage.setItem("nannyTkn", JSON.stringify(res.data.token));
        console.log("signin", res);
        setUser({ ...res.data.user, token: res.data.token });
        setIsAuth(true);
        if (res.data.user.purpose === "admin") {
          setIsAdmin(true);
          navigate("/admin");
        } else {
          navigate(`/profile/${res.data.user._id}`);
        }
        // console.log(res.data.user);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        // toast.error(error.response.data.message);
        setIsLoading(false);
        setEmail("");
        setPassword("");
      });
  };
  return (
    <div
      className="  h-[100vh]  w-[70%] mx-auto flex 
    flex-col justify-center items-center"
    >
      <h2 className="mb-4 text-coral-red text-3xl font-bold">Logowanie</h2>
      <div>
        <label
          htmlFor="email"
          className=" block text-sm font-bold leading-6 text-coral-red"
        >
          Email
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
            placeholder="jankowalski@test.pl"
          />
        </div>
        <label
          htmlFor="password"
          className="block text-sm font-bold leading-6 text-coral-red mt-2"
        >
          Hasło
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red text-sm sm:leading-6 "
            placeholder="Wpisz hasło"
          />
        </div>
      </div>
      <div onClick={handleSignin}>
        <Button label="Zaloguj" btnStyle="mt-10" iconUrl={arrowRight} />
      </div>
      <div className="mt-4 ">
        <Link to="/forgotPassword" className="text-sm underline text-coral-red">
          Zapomniałem hasła
        </Link>
      </div>
    </div>
  );
};

export default Signin;
