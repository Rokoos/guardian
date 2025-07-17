import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { navLinks, days } from "../constants";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { logout } from "../utils";

const Nav = () => {
  const { user, setUser, setFilters, isAdmin, setIsAdmin, setIsAuth } =
    useContext(UserContext);

  let menuRef = useRef();
  let location = useLocation();
  let navigate = useNavigate();
  const route = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[2];
  // console.log("route", route);
  // console.log("id", id);
  return (
    <div className="flex justify-center">
      <div
        className="hidden md:block top-0 fixed bg-coral-red  w-full max-w-[1920px] z-[1000] py-2"
        ref={menuRef}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
          {/* navLinks */}
          <div className="hidden md:block ">
            <div className=" flex justify-end  space-x-4">
              <Link
                className={`${
                  route === "orders"
                    ? "text-coral-red bg-white"
                    : "text-white bg-coral-red"
                } px-3 py-2 rounded-md text-md font-bold `}
                to="/orders"
              >
                Zlecenia
              </Link>

              {user ? (
                <div className="flex ">
                  {isAdmin ? (
                    <Link
                      className={`${
                        route === "admin"
                          ? "text-coral-red bg-white"
                          : "text-white bg-coral-red"
                      } px-3 py-2 rounded-md text-md font-bold `}
                      to="/admin"
                    >
                      Admin
                    </Link>
                  ) : (
                    <Link
                      className={`${
                        route === "profile" && user._id === id
                          ? "text-coral-red bg-white"
                          : "text-white bg-coral-red"
                      } px-3 py-2 rounded-md text-md font-bold `}
                      to={`/profile/${user._id}`}
                    >
                      Profil
                    </Link>
                  )}

                  <div
                    // onClick={() => {
                    //   logout();
                    //   setUser(null);
                    //   setIsAuth(false);
                    //   setIsAdmin(false);
                    //   navigate("/");
                    // }}
                    className="text-white px-3 py-2 ml-2 rounded-md text-md font-bold cursor-pointer"
                  >
                    Wyloguj
                  </div>
                </div>
              ) : (
                <div className="flex ">
                  <Link
                    className={`${
                      route === "signup"
                        ? "text-coral-red bg-white"
                        : "text-white bg-coral-red"
                    } px-3 py-2 rounded-md text-md font-bold `}
                    to="/signup"
                  >
                    Rejestracja
                  </Link>
                  <Link
                    to="/signin"
                    className={`${
                      route === "signin"
                        ? "text-coral-red bg-white"
                        : "text-white bg-coral-red"
                    } px-3 py-2 rounded-md text-md font-bold `}
                  >
                    Logowanie
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
