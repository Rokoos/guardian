import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { updateUser } from "../api";
import { UserContext } from "../context/UserContext";
import { FaRegHeart } from "react-icons/fa";
const initFavs = [
  "678977f2601b0bfc59143661",
  "678976e7601b0bfc59143636",
  "6789744e601b0bfc591435bd",
];

const Nanny = ({ item }) => {
  // console.log("item", item);
  // console.log("favs", favs);
  const authtoken = JSON.parse(localStorage.getItem("nannyTkn"));

  const { user, setUser } = useContext(UserContext);
  const { age, _id, name, surname, photoUrl, role } = item;
  // console.log("_id", typeof _id);

  const checkId = (id) => {
    return user.favUsers.some((el) => el === id);
  };

  const handleFavorite = async (id) => {
    // console.log("tralalala");
    let arr;
    if (checkId(id)) {
      arr = user.favUsers.filter((el) => el !== id);
    } else {
      arr = user.favUsers;
      arr.push(id);
    }
    // console.log("arr", arr);
    const response = await updateUser(authtoken, user._id, { favUsers: arr });
    // console.log("updated", response.data);
    setUser(response.data);
  };
  return (
    /*  <div className="border-2 border-yellow-500 flex justify-start items-center p-3 mb-5 rounded-lg">
      <div className="w-[30%]">
        <img src={photoUrl} alt="" className="w-3/5 rounded" />
      </div>

      <div className="flex flex-col items-center w-[70%] text-yellow-500">
        {name && <span>{`${name} ${surname}`}</span>}
        {age && <span>{age}</span>}
        <Link
          to={`/profile/${_id}`}
          className="rounded-full bg-yellow-500 text-black px-5 mt-2"
        >
          More
        </Link>
      </div>
    </div> */
    <>
      <div className="group relative max-w-xs w-full md:w-[6/12] overflow-hidden rounded-2xl shadow-lg  mb-8">
        <img
          src={photoUrl}
          alt=""
          className="transition-transform group-hover:scale-110 duration-200 w-full h-[300px] object-cover"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
          <div className="p-4 text-white  w-full ">
            <div className="flex flex-row  justify-between items-center">
              <h3 className="text-xl font-bold mb-2">
                {name} {surname}
              </h3>
              {user && user.role !== role && (
                <div
                  className={`${
                    checkId(_id) ? "text-coral-red font-bold" : ""
                  }`}
                >
                  <FaRegHeart
                    className="mr-2 w-6 h-6 cursor-pointer"
                    onClick={() => handleFavorite(_id)}
                  />
                </div>
              )}
            </div>
            <h5 className={`${!age && "hidden"}`}>Age {age}</h5>
            <div className={`flex items-center w-full  justify-end `}>
              <Link
                to={`/profile/${_id}`}
                className={`${
                  role === "parent" && "mt-6"
                } border-2  p-2 rounded-lg border-yellow-400  text-yellow-500 hover:bg-yellow-500 hover:text-white hover:border-white transition-transform duration-100`}
              >
                More &raquo;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nanny;

// RT9A8VDH7G84R3GQA1WK85PZ    recovery code sendgrid warsawnanny

//G49J281JXATHLFEYN262CFP1 recovery code rokushehe
