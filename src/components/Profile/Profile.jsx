import { useState, useContext, useCallback, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import Button from "../Button";
import { toast } from "react-toastify";
import { getUser, updateUser } from "../../api";
import {
  FaMobileAlt,
  FaMoon,
  FaStar,
  FaRegUser,
  FaRegHeart,
} from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { Link, useParams, useNavigate } from "react-router-dom";
import { checkSchedule, getCategory } from "../../utils";
import Review from "../Review/Review";
import Message from "../Message";
import DeleteProfile from "./DeleteProfile";
import StarRatings from "../StarRatings";
import { offers, demoUser, demoGuardians } from "../../constants";
import { IoMdSunny, IoIosMoon } from "react-icons/io";
import { FiStar } from "react-icons/fi";
import Modal from "../Modal";
import AddReview from "../Review/AddReview";
import InnerImageZoom from "react-inner-image-zoom";
import moment from "moment";
import "moment/locale/pl"; // without this line it didn't work

import "react-inner-image-zoom/lib/styles.min.css";
// const fakeUser = {
//   status: "nanny",
//   photo: mua,
//   name: "Marcin",
//   surname: "Widomski",
//   email: "m.widomski@tlen.pl",
//   phone: 797992207,
//   additionalServices: ["cleaning house", "cooking dinner", "walking the dog "],
//   additionalSkills: ["teaching read & write", "taking a walk"],
//   currency: "EUR",
//   weekDayPay: 10,
//   weekNightPay: 12,
//   weekendDayPay: 12,
//   weekendNightPay: 14,
//   languages: [
//     { language: "English", level: "B2" },
//     { language: "German", level: "C1" },
//   ],
// };

const Profile = () => {
  const { id } = useParams();
  // console.log("id profile", id);
  moment.locale("pl");
  // console.log("useParams", useParams());
  // let location = useLocation();

  let navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("nannyTkn"));
  // const [isLoading, setIsLoading] = useState(false);
  // const [modalType, setModalType] = useState("");
  // console.log("modalType", modalType);
  const [myReactions, setMyReactions] = useState([]);
  const [myWatchedOrders, setMyWatchedOrders] = useState([]);
  const [showReactions, setShowReactions] = useState(false);
  const [showWatchedOrders, setShowWatchedOrders] = useState(false);
  const [showMyOrders, setShowMyOrders] = useState(false);
  // console.log("reactions", myReactions);
  // const [workingDays, setworkingDays] = useState(days);
  const [person, setPerson] = useState(null);
  // console.log("dude", person);
  const [reviewText, setReviewText] = useState("");
  // console.log("text", reviewText);
  const [stars, setStars] = useState(null);
  // console.log("stars", stars);
  // console.log("person", person);
  // console.log("workingDays", workingDays);
  const { user, setUser, isAdmin, setIsLoading, isLoading } =
    useContext(UserContext);
  const { showModal, setShowModal, modalType, setModalType } =
    useContext(ModalContext);
  const [scale, setScale] = useState(1);
  // console.log("loading", isLoading);
  //

  // console.log("mobile", phoneFormat(user.mobile));
  // console.log("mobile", user.mobile);
  // phone.match(/.{1,3}/g).join(" ")
  // console.log("user-profile", user);
  // const [isOpened, setIsOpened] = useState(false);
  // const [showModal1, setShowModal1] = useState(isOpened);

  // const [showModal2, setShowModal2] = useState(isOpened);
  // const [showModal3, setShowModal3] = useState(isOpened);

  // const [showModal, setShowModal] = useState(isOpened);
  // const heniek = (user_id) => {
  //   if (person) {
  //     return person.reviews.find((el) => el.reviewedBy._id === user_id);
  //   }
  // };
  // if (user) {
  //   console.log("heniek", heniek(user._id));
  // }

  const [showCV, setShowCV] = useState(false);
  const [showRecLetter, setShowRecLetter] = useState(false);
  useEffect(() => {
    let arr1 = offers.filter((el) => el.reactions.includes(id));
    setMyReactions(arr1);
    let arr2 = offers.filter((el) => el.category === 3);
    setMyWatchedOrders(arr2);
  }, []);
  const fetchUser = useCallback(() => {
    // if (id === user._id) {
    //   setPerson(user);
    // } else {
    //   getUser(id, token)
    //     .then((res) => {
    //       setPerson(res.data);

    //       // setIsChecked(res.data.status);
    //       // console.log("fetchUser", res.data);
    //       // setIsLoading(false);
    //     })
    //     .catch((error) => {
    //       toast.error(error.response.data.error);
    //       navigate("/nannys");
    //       // setIsLoading(false);
    //     });
    // }
    let guardian = demoGuardians.find((el) => el._id === id);
    // console.log("singleOrder", guardian);
    setPerson(guardian);
    // console.log("person");
  }, [id, navigate, user]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // const handleClick = (item) => {
  //   setworkingDays(
  //     workingDays.map((day) =>
  //       day.d === item.d ? { ...day, av: !day.av } : day
  //     )
  //   );
  // };

  // const handleShift = (item, shift) => {
  //   setworkingDays(
  //     workingDays.map((day) =>
  //       day.d === item.d
  //         ? {
  //             ...day,
  //             [shift]: !day[shift],
  //           }
  //         : day
  //     )
  //   );
  // };

  const shiftColors = (shift) => {
    if (shift) {
      return "bg-green-600";
    } else if (!shift) {
      return "bg-coral-red";
    }
  };
  // const handleCheckboxChange = () => {
  //   // setIsChecked((previous) => !previous);
  //   // console.log("status", isChecked);
  //   updateUser(token, id, { status: !person.status }).then((response) =>
  //     setPerson(response.data)
  //   );
  // };
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
    const response = await updateUser(token, user._id, { favUsers: arr });
    // console.log("updated", response.data);
    setUser(response.data);
  };

  return (
    <>
      {person && (
        <div className=" w-full mt-10  flex justify-center items-center mb-20 ">
          <div
            className={`${
              !person.photoUrl ? "mt-20" : ""
            } flex  w-[80vw] flex-col items-center justify-center  md:mt-20`}
          >
            {person?.photoUrl ? (
              <div className="relative ">
                <img
                  src={person.photoUrl}
                  className="w-[250px]  rounded-md mb-4"
                  alt=""
                />
                <div className="absolute right-5 bottom-8 text-white">
                  {user && user.role !== person.role && (
                    <div
                      className={`${
                        checkId(person._id) ? "text-coral-red font-bold" : ""
                      }`}
                    >
                      <FaRegHeart
                        className="mr-2 w-6 h-6 cursor-pointer"
                        // onClick={() => handleFavorite(person._id)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="border-2 rounded-lg mb-4  border-coral-red bg-white text-coral-red">
                <FaRegUser className="w-[100px] h-[100px] p-5  " />
              </div>
            )}
            <div className=" flex flex-col items-center ">
              <h4 className=" text-gray-500 font-bold text-[1.3rem]">
                {person.name}
              </h4>
              <h4 className="mb-4 text-gray-500 font-bold text-[1.3rem]">
                {person.surname}
              </h4>
            </div>
            {person?.nationality && (
              <div className="flex flex-col items-center">
                <h2 className="font-bold text-center mb-2 text-coral-red">
                  Narodowość:
                </h2>
                <h4 className="mb-4 text-gray-500 font-bold text-[1.2rem]">
                  {person.nationality}
                </h4>
              </div>
            )}

            {person?.mobile && (
              <div className="flex items-center mb-4">
                <FaMobileAlt className="text-coral-red w-5 h-5 mr-2 " />{" "}
                <span className="text-gray-500 font-bold ">
                  {person.mobile}
                </span>
              </div>
            )}

            {person.reviewsStarsAverage > 0 && (
              <div className="flex w-full   items-center justify-center my-2  ">
                <div className="flex gap-1  mb-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex justify-center">
                      <FiStar
                        size={25}
                        strokeWidth={0}
                        fill={
                          index + 1 <= person.reviewsStarsAverage
                            ? "gold"
                            : "#D6DBDF"
                        }
                        // cursor="pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Locations */}
            {person.role === "nanny" && person.locations.length > 0 && (
              <div className=" mt-5 mb-5 w-[200px]  flex flex-col items-center">
                <h2 className="font-bold text-center mb-2 text-coral-red">
                  Lokalizacje:
                </h2>

                {person.locations.map((loc, index) => (
                  <h4 className="text-gray-700" key={index}>
                    {loc}
                  </h4>
                ))}
              </div>
            )}

            {person &&
              person.role === "nanny" &&
              checkSchedule(person.workingDays) && (
                <div className="mt-4 p-4 rounded-lg border-2  border-coral-red w-[16rem] md:w-[20rem] mb-6">
                  <h4 className="text-center mb-2 text-gray-700 "> Grafik</h4>

                  <div className="flex flex-col gap-2 ">
                    {person.workingDays.some((d) => d.av) && (
                      <div className="flex flex-row justify-between text-sm text-gray-600  ">
                        <span>Dzień</span>
                        <span className="ml-8">Do 20:00</span>
                        <span>Po 20:00</span>
                      </div>
                    )}
                    {person.workingDays
                      .filter((a) => a.av === true)
                      .map((day) => (
                        <div
                          key={day.d}
                          className=" flex flex-row items-center w-full justify-around text-white  "
                        >
                          <div
                            className={`rounded-lg flex justify-center items-center w-[60px] h-[33px]  ${
                              day.av ? "bg-green-600" : "bg-red-600"
                            } -ml-6 md:-ml-10`}
                          >
                            {day.d}
                          </div>

                          <div
                            className={`${shiftColors(
                              day.dayShift
                            )} rounded-lg w-[33px] h-[33px] flex justify-center text-xl  items-center text-white  disabled:bg-slate-400 `}
                            disabled={!day.av}
                          >
                            <IoMdSunny />
                          </div>
                          <div
                            className={`${shiftColors(
                              day.nightShift
                            )} rounded-lg w-[33px]  h-[33px] flex justify-center text-xl  items-center text-white  disabled:bg-slate-400 -mr-6 md:-mr-10`}
                            disabled={!day.av}
                          >
                            <IoIosMoon />
                          </div>
                        </div>
                      ))}
                  </div>
                  {user._id === id && (
                    <h3 className="text-center mt-5 text-gray-500 font-bold">
                      {" "}
                      Edytuj profil aby zmienić grafik
                    </h3>
                  )}
                </div>
              )}
            {person.languages.length > 0 && (
              <div className=" mt-5 mb-5 w-[200px]">
                <h2 className="font-bold text-center mb-2 text-coral-red">
                  Języki:
                </h2>
                <div className="flex flex-col justify-between text-gray-600 ">
                  {person.languages.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <h4>{item.lng}</h4>
                      <h4>Poziom {item.level}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {person.additionalServices.length > 0 && (
              <div className=" mt-5 mb-5 w-[200px]">
                <h2 className="font-bold text-center mb-2 text-coral-red">
                  Dodatkowe usługi:
                </h2>

                <div className="flex flex-col align-middle justify-center text-gray-600 ">
                  {person.additionalServices.map((item, index) => (
                    <div key={index} className="flex justify-center">
                      <h5>{item},</h5>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {person.additionalSkills.length > 0 && (
              <div className=" mt-5 mb-5 w-[200px]">
                <h2 className="font-bold text-center mb-2 text-coral-red">
                  Dodatkowe Umiejętności:
                </h2>

                <div className="flex flex-col align-middle justify-center text-gray-600 ">
                  {person.additionalSkills.map((item, index) => (
                    <div key={index} className="flex justify-center">
                      <h5>{item},</h5>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {person.weekDayPay && (
              <div className=" mt-5 mb-5 w-[200px]">
                <h2 className="font-bold text-center mb-2 text-coral-red">
                  Stawka godzinowa:
                </h2>
                <div className="flex justify-between text-gray-600 ">
                  <div>
                    <h4>Dzień:</h4>
                    <h4>Noc:</h4>
                    <h4>Weekend dzień:</h4>
                    <h4>Weekend noc:</h4>
                  </div>
                  <div>
                    <h4>
                      {`${person.weekDayPay}        
                  ${person.currency}`}
                    </h4>
                    <h4>{` ${person.weekNightPay} 
                  ${person.currency}`}</h4>
                    <h4>{` ${person.weekendDayPay} 
                  ${person.currency}`}</h4>
                    <h4>{` ${person.weekendNightPay} 
                  ${person.currency}`}</h4>
                  </div>
                </div>
              </div>
            )}
            {person.cvUrl && (
              <>
                <button
                  className="mb-4 bg-coral-red py-2 px-3 rounded-lg text-white"
                  onClick={() => setShowCV(!showCV)}
                >
                  {showCV ? "Ukryj CV" : "Pokaż CV"}
                </button>
                {showCV && (
                  <>
                    <div className="border-2 mt-3 mb-4  border-coral-red hidden md:block">
                      <img
                        id="image-generated"
                        src={person && person.cvUrl}
                        alt="pdfImage"
                        style={{
                          // width: "150vw",
                          height: "90vh",
                          margin: "0",
                          border: "none",
                        }}
                      />
                    </div>
                    <div className="md:hidden border-2 border-coral-red mb-4">
                      <InnerImageZoom
                        src={person && person.cvUrl}
                        zoomSrc={person && person.cvUrl}
                        moveType="drag"
                      />
                    </div>
                  </>
                )}
              </>
            )}

            {person.recommendationLetterUrl && (
              <>
                <button
                  className="mb-4 bg-coral-red py-2 px-3 rounded-lg text-white"
                  onClick={() => setShowRecLetter(!showRecLetter)}
                >
                  {showRecLetter
                    ? "Ukryj List Polecający"
                    : "Pokaż List Polecający"}
                </button>
                {showRecLetter && (
                  // <div className="border-2 mt-3 border-coral-red">
                  //   <img
                  //     id="image-generated"
                  //     src={person.recommendationLetterUrl}
                  //     alt="pdfImage"
                  //     style={{
                  //       width: "100%",
                  //       height: "100%",
                  //       margin: "0",
                  //       border: "none",
                  //     }}
                  //   />
                  // </div>
                  <>
                    <div className="border-2  mt-3 mb-4  border-coral-red hidden md:block">
                      <img
                        id="image-generated"
                        src={person && person.recommendationLetterUrl}
                        alt="pdfImage"
                        style={{
                          // width: "150vw",
                          height: "90vh",
                          margin: "0",
                          border: "none",
                        }}
                      />
                    </div>
                    <div className="md:hidden border-2 border-coral-red mb-4">
                      <InnerImageZoom
                        src={person && person.recommendationLetterUrl}
                        zoomSrc={person && person.recommendationLetterUrl}
                        moveType="drag"
                      />
                    </div>
                  </>
                )}
              </>
            )}
            {user && user._id === id && (
              <>
                <Link className="my-4" to={`/edit-profile/${user._id}`}>
                  <Button label="Edytuj profil" />
                </Link>

                <Link className="my-4" to="/addOrder">
                  <Button label="Dodaj zlecenie" />
                </Link>
              </>
            )}
            {user &&
              user._id === id &&
              user.role === "nanny" &&
              myReactions.length > 0 && (
                <div className=" w-full flex flex-col items-center mt-4">
                  <h5
                    className="underline font-bold mb-2 text-coral-red cursor-pointer "
                    onClick={() => setShowReactions(!showReactions)}
                  >
                    {showReactions
                      ? `Ukryj Moje Reakcje`
                      : "Pokaż moje reakcje"}
                  </h5>
                  {showReactions && (
                    <div className="w-full max-w-[20rem]">
                      {myReactions.map((el, i) => (
                        <Link
                          key={el._id}
                          to={`/order/${el._id}`}
                          className=" flex flex-col items-center border border-coral-red p-2 mb-2 rounded-xl"
                        >
                          <span className="text-sm text-gray-700">
                            {" "}
                            {el.description.substring(0, 40)}
                          </span>
                          <div className="flex w-full justify-center items-center mt-1 text-sm">
                            <FaSackDollar className="h-4 w-4 mr-2 text-coral-red" />
                            <span>{` ${el.hourlyRate} PLN/h`}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            {/* Watched orders */}
            {user &&
              user._id === id &&
              user.role === "nanny" &&
              myWatchedOrders.length > 0 && (
                <div className=" w-full flex flex-col items-center mt-4">
                  <h5
                    className="underline font-bold mb-2 text-coral-red cursor-pointer"
                    onClick={() => setShowWatchedOrders(!showWatchedOrders)}
                  >
                    {showWatchedOrders
                      ? "Ukryj Obserwowane zlecenia"
                      : "Pokaż Obserwowane zlecenia"}
                  </h5>
                  {showWatchedOrders && (
                    <div className="w-full max-w-[20rem]">
                      {myWatchedOrders.map((el, i) => (
                        <Link
                          key={el._id}
                          to={`/order/${el._id}`}
                          className=" flex flex-col items-center border border-coral-red p-2 mb-2 rounded-xl"
                        >
                          <span className="text-sm text-gray-700">
                            {" "}
                            {el.description.substring(0, 40)}
                          </span>
                          <div className="flex w-full justify-center items-center mt-1 ">
                            <FaSackDollar className="h-4 w-4 mr-2 text-coral-red" />
                            <span>{` ${el.hourlyRate} PLN/h`}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

            {/* User's orders */}
            {user && person?.orders?.length > 0 && (
              <div className=" w-full flex flex-col items-center mt-4">
                <h5
                  className="underline font-bold mb-2 text-coral-red cursor-pointer"
                  onClick={() => setShowMyOrders(!showMyOrders)}
                >
                  {showMyOrders ? "Ukryj zlecenia" : "Pokaż zlecenia"}
                </h5>
                {showMyOrders && (
                  <div className="w-full max-w-[20rem]">
                    {/* //powinno być person.orders.map!!! */}
                    {offers.map((el, i) => (
                      <Link
                        key={el._id}
                        to={`/order/${el._id}`}
                        className=" flex flex-col items-center border border-coral-red p-2 mb-2 rounded-xl"
                      >
                        <span className="text-sm text-gray-700">
                          {" "}
                          {getCategory(el.category)}
                        </span>
                        <div className="flex w-full justify-center items-center mt-1 ">
                          <FaSackDollar className="h-4 w-4 mr-2 text-coral-red" />
                          <span>{` ${el.hourlyRate} PLN/h`}</span>
                        </div>
                        <span className="text-sm/3 mt-2">{`Dodano ${moment(
                          el.createdAt
                        ).format("L")}`}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Fav Users */}

            {user && user._id === id && user?.favUsers.length > 0 && (
              <div className=" w-full flex flex-col items-center mt-4">
                <h5 className="underline font-bold mb-2 text-coral-red">
                  {user.role === "parent"
                    ? "My Favorite Nannys"
                    : "My Favorite Parents"}
                </h5>
                <div className="w-full max-w-[20rem]">
                  {user &&
                    user?.favs.map((el) => (
                      <Link
                        key={el._id}
                        to={`/profile/${el._id}`}
                        className=" flex flex-row justify-between border border-coral-red p-2 mb-2 rounded-xl"
                      >
                        <div className="w-1/4">
                          <img
                            src={el.photoUrl}
                            alt=""
                            className="h-8  rounded-xl "
                          />
                        </div>
                        <div className="w-3/4  flex justify-start items-center gap-2 text-gray-700">
                          <span>{el.name}</span>
                          <span>{el.surname}</span>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}

            {user && user._id !== id && (
              <Modal
                person={person}
                title="Wyślij Wiadomość"
                style=" bg-coral-red w-full max-w-[16rem] p-4 rounded-full mb-4 text-white border hover:border-coral-red hover:bg-white hover:text-coral-red duration-150 ease-out "
                reviewText={reviewText}
                user_id={user._id}
                nannyId={id}
                showModal={modalType === "message" && showModal}
                // setShowModal={setShowModal}
                modalName="message"
                // setModalType={setModalType}
                modalStyle="max-w-[40rem]"
              >
                <Message
                  // setShowModal={setShowModal3}
                  // setShowModal={setShowModal}
                  // setModalType={setModalType}
                  person={person}
                />
              </Modal>
            )}
            {user &&
              user._id !== id &&
              user.purpose === "user" &&
              user.role !== person.role &&
              !person.reviews.find((el) => el.reviewedBy._id === user._id) && (
                <>
                  <Modal
                    person={person}
                    title="Dodaj Opinię"
                    style=" bg-green-500 w-full border max-w-[16rem] p-4 rounded-full mb-4 text-white hover:bg-white hover:text-green-500 hover:border-green-500  transition duration-300 ease-in-out "
                    reviewText={reviewText}
                    user_id={user._id}
                    nannyId={id}
                    // showModal={showModal1}
                    showModal={modalType === "addReview" && showModal}
                    // setShowModal={setShowModal1}
                    // setShowModal={setShowModal}
                    modalName="addReview"
                    // setModalType={setModalType}
                    modalStyle="max-w-[40rem]"
                  >
                    <AddReview
                      person={person}
                      setPerson={setPerson}
                      reviewText={reviewText}
                      setReviewText={setReviewText}
                      // setShowModal={setShowModal1}
                      // setShowModal={setShowModal}

                      nannyId={id}
                      // userId={user._id}
                      setStars={setStars}
                      stars={stars}
                    />
                  </Modal>
                  {/* {person && person?.reviews.length === 0 && (
                    <div className="h-[50px]"></div>
                  )} */}
                </>
              )}
            {user && user._id !== id && !isAdmin && (
              <Modal
                title="Zgłoś Naruszenie"
                style=" bg-red-800 w-full  rounded-full p-4 border border-red-500  hover:bg-white hover:text-red-500 transition duration-300 ease-in-out text-white max-w-[16rem] "
                modalName="violation"
                showModal={modalType === "violation" && showModal}
                modalStyle="max-w-[40rem]"
              >
                <Message
                  // setShowModal={setShowModal3}
                  // setShowModal={setShowModal}
                  // setModalType={setModalType}
                  person={person}
                />
              </Modal>
            )}

            {user && user._id !== person._id && isAdmin && (
              <div className=" w-[16rem] ">
                <Modal
                  title="Usuń Profil"
                  style=" bg-red-800 w-full rounded-full p-4 border-2 border-red-500  hover:bg-white hover:text-red-500 transition duration-300 ease-in-out text-white"
                  showModal={modalType === "adminDelete" && showModal}
                  setShowModal={setShowModal}
                  modalName="adminDelete"
                  modalStyle="max-w-[40rem]"
                >
                  <DeleteProfile id={id} email={person.email} />
                </Modal>
              </div>
            )}

            {person && person?.reviews.length > 0 && (
              <div className="w-full max-w-[30rem] flex flex-col items-center">
                <h2 className="mt-8 mb-4 underline font-bold text-coral-red">
                  Opinie
                </h2>
                {person.reviews.map((rev) => (
                  <Review
                    key={rev._id}
                    rev={rev}
                    setPerson={setPerson}
                    person={person}
                    // setShowModal1={setShowModal1}
                    // setShowModal2={setShowModal2}
                    // setShowModal={setShowModal}
                    // showModal1={showModal1}
                    // showModal2={showModal2}
                    // showModal={showModal}
                    // modalType={modalType}
                    // setModalType={setModalType}
                    setStars={setStars}
                    stars={stars}
                    reviewText={reviewText}
                    setReviewText={setReviewText}
                  />
                ))}
              </div>
            )}
            {/* <Modal title="Add review" isOpened={isOpened} /> */}
          </div>
        </div>
      )}
      <div className="h-[50px]"></div>
    </>
  );
};

export default Profile;

//UWyS8mr2HDIZJVEJ
