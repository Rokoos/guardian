import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { logout, menuStyles } from "../utils";
import { getFilteredUsers } from "../api";
import { FaHome, FaUser, FaEnvelope } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdLogIn } from "react-icons/io";
import { RiLogoutCircleLine, RiUserAddFill } from "react-icons/ri";
import { days } from "../constants";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Menu = () => {
  const {
    user,
    setUser,
    setResults,
    filters,
    setFilters,
    setUsers,
    setIsLoading,
    setIsAuth,
    isAdmin,
    setIsAdmin,
  } = useContext(UserContext);

  const token = localStorage.getItem("nannyTkn");

  // console.log("userChats", userChats);
  // console.log("usermenu", user);
  let location = useLocation();
  let navigate = useNavigate();
  // console.log("location", location.pathname);
  const route = location.pathname.split("/")[1];
  // console.log("url", location.pathname.split("/")[1]);
  const id = location.pathname.split("/")[2];

  // useEffect(() => {
  //   setIsLoading(true);

  //   getFilteredUsers(filters, 1)
  //     .then((res) => {
  //       // console.log("res.data", res.data.users);
  //       setResults(res.data.results);
  //       setUsers(res.data.users);
  //       // if (user && user._id) {
  //       //   setUsers(res.data.users.filter((nanny) => nanny._id !== user._id));
  //       // } else {
  //       //   setUsers(res.data.users);
  //       // }

  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsLoading(false);
  //     });
  // }, [filters.role]);
  const loggedInMenu = () => (
    <>
      {isAdmin && (
        <Link
          to="/admin"
          className={`w-4/12  p-5 border-2 cursor-pointer flex flex-col items-center justify-between  ${
            route === "admin"
              ? "border-coral-red bg-white text-coral-red"
              : "border-white bg-coral-red text-white"
          } transition-all duration-200`}
        >
          <FaUser className="w-6 h-6" />

          <span className="text-sm">Admin</span>
        </Link>
      )}
      {!isAdmin && (
        <Link
          to={`/profile/${user._id}`}
          className={`w-4/12  p-5 border-2 cursor-pointer flex flex-col items-center justify-between  ${
            route === "profile" && user._id === id
              ? "border-coral-red bg-white text-coral-red"
              : "border-white bg-coral-red text-white"
          } transition-all duration-200`}
        >
          <FaUser className="w-6 h-6" />

          <span className="text-sm">Profil</span>
        </Link>
      )}

      <div
        className="w-4/12  p-5 border-2 cursor-pointer  flex flex-col  items-center justify-between border-white  transition-all duration-200"
        // onClick={() => {
        //   logout();
        //   setUser(null);
        //   setIsAuth(false);
        //   setIsAdmin(false);
        //   navigate("/");
        // }}
      >
        <RiLogoutCircleLine className="w-6 h-6" />
        <span className="text-sm">Wyloguj</span>
      </div>
    </>
  );

  const loggedOutMenu = () => (
    <>
      <Link
        to="/signin"
        className={`w-4/12 p-5 border-2 cursor-pointer flex flex-col items-center justify-between 
        ${
          route === "signin"
            ? "border-coral-red bg-white text-coral-red"
            : "border-white bg-coral-red text-white"
        } transition-all duration-200`}
      >
        <IoMdLogIn className="w-6 h-6" />

        <span className="text-sm">Logowanie</span>
      </Link>
      <Link
        to="/signup"
        className={`w-4/12 p-5 border-2 cursor-pointer flex flex-col items-center justify-between  ${
          route === "signup"
            ? "border-coral-red bg-white text-coral-red"
            : "border-white bg-coral-red text-white"
        } transition-all duration-200`}
      >
        <RiUserAddFill className="w-6 h-6" />

        <span className="text-sm">Rejestracja</span>
      </Link>
    </>
  );
  return (
    <div className=" md:mt-0 md:hidden h-[5rem] fixed bottom-0 w-full bg-coral-red flex text-white z-10 ">
      <Link
        to="/orders"
        // onClick={() => {
        //   setFilters({
        //     userId: user ? user._id : "",
        //     role: "nanny",
        //     age: 65,
        //     hourRate: 60,
        //     nationality: "",
        //     locations: [],
        //     workingDays: days,
        //     stars: 0,
        //   });
        // }}
        className={` w-4/12 p-5 border-2 cursor-pointer flex flex-col items-center justify-between ${
          route === ""
            ? "border-coral-red bg-white text-coral-red"
            : "border-white bg-coral-red text-white"
        } transition-all duration-200`}
      >
        <FaPeopleGroup className="w-6 h-6" />

        <span className="text-sm">Zlecenia</span>
      </Link>

      {user ? loggedInMenu() : loggedOutMenu()}
    </div>
  );
};

export default Menu;
