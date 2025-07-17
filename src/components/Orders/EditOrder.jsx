import { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ModalContext } from "../../context/ModalContext";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import {
  categories,
  disabilityLevels,
  order1,
  order2,
  order3,
  offers,
} from "../../constants";
import arrowRight from "../../assets/icons/arrow-right.svg";
import { editOrder, getOrder } from "../../api";
import Modal from "../Modal";
import Button from "../Button";
import Switcher from "../Switcher";
import { IoIosCloseCircle } from "react-icons/io";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import DeleteOrder from "./DeleteOrder";
import Loader from "../Loader";

const EditOrder = () => {
  const { id } = useParams();
  const {
    user,
    isAuth,
    isAdmin,
    setUser,
    setIsAuth,
    setIsAdmin,
    setIsLoading,
    isLoading,
  } = useContext(UserContext);
  // console.log("isLoading", isLoading);
  const { setShowModal, modalType, showModal } = useContext(ModalContext);
  let navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  // console.log("cat", category);
  const [numberOfKids, setNumberOfKids] = useState(1);
  // console.log("numOfKids", numberOfKids);
  const [age, setAge] = useState([]);
  const [location, setLocation] = useState("");
  // console.log("age", age);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [isUrgent, setUrgent] = useState(false);
  const [description, setDescription] = useState("");

  // console.log("location", location);
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [services, setServices] = useState([]);
  const [service, setService] = useState("");
  const [mobile, setMobile] = useState("");
  // console.log("mobile", mobile);
  const [disability, setDisability] = useState("lekki");
  // console.log("status", isChecked);
  const token = JSON.parse(localStorage.getItem("nannyTkn"));
  const fetchOrder = useCallback(() => {
    // getOrder(token, id)
    //   .then((res) => {
    //     const {
    //       category,
    //       numberOfKids,
    //       age,
    //       location,
    //       hourlyRate,
    //       description,
    //       urgent,
    //       skills,
    //       services,
    //       mobile,
    //       disabilityLevel,
    //     } = res.data;
    //     setCategory(category);
    //     if (numberOfKids) setNumberOfKids(numberOfKids);
    //     setAge(age);
    //     setLocation(location);
    //     setHourlyRate(hourlyRate);
    //     setDescription(description);
    //     setUrgent(urgent);
    //     setSkills(skills);
    //     setServices(services);
    //     setMobile(mobile);
    //     if (disabilityLevel) setDisability(disabilityLevel);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
    let singleOffer = offers.find((el) => el._id === id);
    setCategory(singleOffer.category);
    if (singleOffer.numberOfKids) setNumberOfKids(singleOffer.numberOfKids);
    setAge(singleOffer.age);
    setLocation(singleOffer.location);
    setHourlyRate(singleOffer.hourlyRate);
    setDescription(singleOffer.description);
    setUrgent(singleOffer.urgent);
    setSkills(singleOffer.skills);
    setServices(singleOffer.services);
    setMobile(singleOffer.mobile);
    if (singleOffer.disabilityLevel) setDisability(singleOffer.disabilityLevel);
  }, []);
  useEffect(() => {
    fetchOrder();
    // if (!user) toast.warning("Zaloguj się by zareagować na zlecenie");
  }, [fetchOrder]);

  // useEffect(() => {
  //   setCategory(order3.category);
  //   if (order3.numberOfKids) setNumberOfKids(order3.numberOfKids);
  //   setAge(order3.age);
  //   setLocation(order3.location);
  //   setHourlyRate(order3.hourlyRate);
  //   setDescription(order3.description);
  //   setUrgent(order3.urgent);
  //   setSkills(order3.skills);
  //   setServices(order3.services);
  //   setMobile(order3.contact);
  //   if (order3.disabilityLevel) setDisability(order3.disabilityLevel);
  // }, []);
  const handleCheckboxChange = () => setUrgent((previous) => !previous);

  const handleSkill = (i, e) => {
    if (i === 0 || i > 0) {
      let arr = [...skills];
      arr[i] = e.target.value;
      setSkills(arr);
    } else {
      setSkill(e.target.value);
    }
  };

  const addSkill = () => {
    let arr = [...skills];
    arr.push(skill);
    setSkills(arr);
    setSkill("");
  };

  const removeSkill = (index) =>
    setSkills([...skills.filter((_, i) => i !== index)]);
  /*  */

  /*  */

  const handleService = (i, e) => {
    if (i === 0 || i > 0) {
      let arr = [...services];
      arr[i] = e.target.value;
      setServices(arr);
    } else {
      setService(e.target.value);
    }
  };
  const addService = () => {
    let arr = [...services];
    arr.push(service);
    setServices(arr);
    setService("");
  };

  const removeService = (index) =>
    setServices([...services.filter((_, i) => i !== index)]);

  /*  */
  const handleKidsNum = (num) => {
    setNumberOfKids(num);
    if (age.length > 0) {
      setAge([...age.slice(0, num)]);
    }
  };
  const handleAge = (e, i) => {
    if (numberOfKids == 1) {
      setAge([e.target.value]);
    } else {
      let newAge = [...age];
      newAge[i] = e.target.value;
      setAge(newAge);
    }
  };
  const handleCategory = (e) => {
    let val = e.target.value;
    setCategory(val);
    setAge([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      id,
      category,
      numberOfKids: category == 1 ? numberOfKids : null,
      age,
      location,
      hourlyRate,
      urgent: isUrgent,
      description,
      skills,
      services,
      mobile,
      disability: category == 3 ? disability : null,
    };
    editOrder(token, data)
      .then((res) => {
        console.log(res.data);
        navigate(`/order/${id}`);
      })
      .catch((error) => console.log(error));
    console.log("update data", data);
  };

  return (
    <div className="flex flex-col mx-auto  items-center mt-10 md:mt-20 max-w-[1200px] ">
      <h2 className="mb-4 text-coral-red text-3xl font-bold">
        Edycja zlecenia
      </h2>
      <div className="flex flex-col md:flex-row  md:justify-center">
        <div className="flex flex-col  md:mr-20">
          {/* Category */}

          <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
            <label
              htmlFor="category"
              className=" block text-sm font-bold  leading-6 text-coral-red mt-2"
            >
              Kategoria
            </label>
            <div className="relative mt-2 rounded-md flex justify-center">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 "></div>
              <select
                id="category"
                className="w-full text-gray-700  p-2 focus:outline focus:outline-2 focus:-outline-offset-2 rounded-md focus:outline-coral-red text-sm"
                onChange={(e) => handleCategory(e)}
                value={category}
              >
                {categories.map((n, index) => (
                  <option value={n.value} key={index}>
                    {n.text}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/*  */}
          {/* Number of kids*/}

          {category == 1 && (
            <div className=" mt-4 mb-4 w-[16rem] md:w-[20rem]">
              <label
                htmlFor="age"
                className=" block text-sm font-bold  leading-6 text-coral-red"
              >
                Liczba dzieci
              </label>
              <div className="flex flex-col justify-between p-2 items-center ">
                <span className="mb-2 text-gray-700">{numberOfKids}</span>
                <input
                  id="numberOfKids"
                  className="range block w-[80%] accent-coral-red cursor-pointer"
                  type="range"
                  value={numberOfKids}
                  min="1"
                  max="5"
                  onChange={(e) => handleKidsNum(e.target.value)}
                />
              </div>
            </div>
          )}
          {Array.from({ length: category == 1 ? numberOfKids : 1 }).map(
            (el, i) => (
              <div key={i} className="mt-4 mb-4 w-[16rem] md:w-[20rem]  ">
                <label
                  htmlFor="locations"
                  className=" block text-sm font-bold  leading-6 text-coral-red mb-2"
                >
                  {category == 1 ? `Wiek dziecka ${i + 1}` : "Wiek"}
                </label>
                <div className="flex flex-col justify-between p-2 items-center ">
                  <span className="mb-2 text-gray-700">{age[i] || 1}</span>
                  <input
                    id="numberOfKids"
                    className="range block w-[80%] accent-coral-red cursor-pointer"
                    type="range"
                    value={age[i] || 1}
                    min="1"
                    max={category == 1 ? "10" : "100"}
                    onChange={(e) => handleAge(e, i)}
                  />
                </div>
              </div>
            )
          )}
          {/* DisibilityLevel */}

          {category == 3 && (
            <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
              <label
                htmlFor="category"
                className=" block text-sm font-bold  leading-6 text-coral-red mt-2"
              >
                Stopień niepełnosprawności
              </label>
              <div className="relative mt-2 rounded-md flex justify-center">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 "></div>
                <select
                  id="category"
                  className="w-full text-gray-700 p-2 focus:outline focus:outline-2 focus:-outline-offset-2 rounded-md focus:outline-coral-red text-sm"
                  onChange={(e) => setDisability(e.target.value)}
                  value={disability}
                >
                  {disabilityLevels.map((n, index) => (
                    <option value={n} key={index}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/*  */}

          {/* Location */}
          <div className="mt-4 mb-4   w-[16rem] md:w-[20rem]  ">
            <label
              htmlFor="locations"
              className=" block text-sm font-bold  leading-6 text-coral-red mb-2"
            >
              Lokalizacja
            </label>

            <div className="flex flex-row  justify-between items-center  border border-rose-500 rounded-2xl px-3 mb-2">
              <textarea
                onChange={(e) => setLocation(e.target.value)}
                rows="1"
                value={location}
                placeholder="np. Warszawa, Wawer "
                className="w-[90%] placeholder:text-sm  py-1 text-sm text-gray-700 focus:outline-none"
              ></textarea>
            </div>
          </div>
          {/*  */}
          {/* Hour Rate */}
          <div className=" mt-2 mb-2 w-[16rem] md:w-[20rem]  ">
            <label className=" block text-sm font-bold  leading-6 text-coral-red mt-3 mb-3">
              Max stawka godzinowa
            </label>
            <div className="flex flex-col  m-auto  ">
              <div className="flex flex-col justify-between p-2 items-center ">
                <span className="mb-2 text-gray-700">{`${hourlyRate} PLN/h`}</span>
                <input
                  id="age"
                  className="range block w-[80%] accent-coral-red cursor-pointer"
                  type="range"
                  value={hourlyRate}
                  min="25"
                  max="100"
                  onChange={(e) => setHourlyRate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col  md:ml-20  ">
          {/* Urgent */}
          <Switcher
            isChecked={isUrgent}
            handleCheckboxChange={handleCheckboxChange}
          />
          {/*Description */}
          <div className="  mt-4 md:mt-0 mb-4 w-[16rem] md:w-[20rem] ">
            <label
              htmlFor="age"
              className=" block text-sm font-bold  leading-6 text-coral-red mt-2"
            >
              Opis zlecenia
            </label>
            <div className="mt-2 flex flex-col  w-full">
              <textarea
                value={description}
                placeholder="Opisz sytuację"
                className="border text-sm text-gray-700 p-2 h-[20vh] border-coral-red w-full rounded-lg text-wrap focus:outline-none"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <span
                className={`mx-auto mt-2 text-sm ${
                  description.length > 1000 ? "text-red-700" : "text-gray-700"
                } `}
              >
                {description.length} of 1000
              </span>
            </div>
          </div>
          {/*  */}

          {/*  */}
          {/* Skills */}
          <div className=" mt-2 mb-2 w-[16rem] md:w-[20rem]  ">
            <label className=" block text-sm font-bold  leading-6 text-coral-red  mb-3">
              Wymagane umiejętności
            </label>
            <div className="w-[100%] text-gray-700 text-sm ">
              {skills.map((s, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center  border border-rose-500 rounded-2xl px-3 py-1 mb-2"
                >
                  <textarea
                    onChange={(e) => handleSkill(index, e)}
                    rows="1"
                    value={s}
                    className="w-[90%]  text-sm "
                  ></textarea>
                  <div className="flex justify-center items-end  cursor-pointer rounded-2xl w-5 h-5  text-white">
                    <IoIosCloseCircle
                      onClick={() => removeSkill(index)}
                      className="w-5 h-5 text-red-700 "
                      color="red"
                    />
                  </div>
                </div>
              ))}
              <div className="flex flex-row  justify-between items-center  border border-rose-500 rounded-2xl px-3 mb-2">
                <textarea
                  onChange={(e) => handleSkill("", e)}
                  rows="1"
                  value={skill}
                  placeholder='np. "miganie"'
                  className="w-[90%] placeholder:text-sm  py-1 focus:outline-none "
                ></textarea>
              </div>
              <div className="w-100  flex justify-center">
                <button
                  disabled={skill === ""}
                  onClick={addSkill}
                  className="w-50 bg-coral-red  rounded-lg px-3 py-1 mt-3 text-white"
                >
                  Dodaj umiejętność
                </button>
              </div>
            </div>
          </div>
          {/*  */}
          {/* Services */}
          <div className="mt-2 mb-2 w-[16rem] md:w-[20rem] ">
            <label className=" block text-sm font-bold  leading-6 text-coral-red mb-3">
              Wymagane czynności
            </label>
            <div className="w-[100%] text-gray-700 text-sm ">
              {services.map((s, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center  border border-rose-500 rounded-2xl px-3 mb-2"
                >
                  <textarea
                    onChange={(e) => handleService(index, e)}
                    rows="1"
                    value={s}
                    className="w-[90%] text-gray-700 "
                  ></textarea>
                  <div className="flex justify-center items-end  cursor-pointer rounded-2xl w-5 h-5  text-white">
                    <IoIosCloseCircle
                      onClick={() => removeService(index)}
                      className="w-5 h-5 text-red-700 "
                      color="red"
                    />
                  </div>
                </div>
              ))}
              <div className="flex flex-row  justify-between items-center  border border-rose-500 rounded-2xl px-3 mb-2">
                <textarea
                  onChange={(e) => handleService("", e)}
                  rows="1"
                  value={service}
                  placeholder="np. pomoc przy toalecie"
                  className="w-[90%] placeholder:text-sm  py-1 focus:outline-none"
                ></textarea>
              </div>
              <div className="w-100  flex justify-center">
                <button
                  disabled={service === ""}
                  onClick={addService}
                  className="w-50 bg-coral-red  rounded-lg px-3 py-1 mt-3 text-white"
                >
                  Dodaj czynność
                </button>
              </div>
            </div>
          </div>
          {/*  */}

          {/* Mobile */}
          <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
            <label
              htmlFor="mobile"
              className=" block text-sm font-bold  leading-6 text-coral-red"
            >
              Kontakt
            </label>
            <PhoneInput
              defaultCountry="pl"
              hideDropdown
              value={mobile}
              onChange={(e) => setMobile(e)}
              className="w-full mt-2"
              inputClassName=" w-full rounded-lg  py-2 text-center text-gray-700 ring-1 ring-inset ring-gray-300  ring-rounded-lg placeholder:text-gray-400 focus:ring-1   focus:ring-coral-red text-md sm:leading-6"
              disableCountryGuess
              forceDialCode
            />
          </div>
        </div>
        {/*  */}

        {/*  */}
      </div>

      <div
        //  onClick={handleSubmit}
        className=" mt-10 "
      >
        <Button
          label="Zapisz zmiany "
          btnStyle=" mb-10 flex mx-auto   space-y-5 md:mt-12 "
          iconUrl={arrowRight}
        />
      </div>
      <div className=" mb-40 w-[15rem] md:mb-10">
        <Modal
          title="Usuń zlecenie"
          style=" bg-red-800 w-full rounded-full p-4 border-2 border-red-500  hover:bg-white hover:text-red-500 transition duration-300 ease-in-out text-white "
          showModal={modalType === "orderDelete" && showModal}
          setShowModal={setShowModal}
          modalName="orderDelete"
          modalStyle={"max-w-[40rem]"}
        >
          <DeleteOrder id={id} />
        </Modal>
      </div>
    </div>
  );
};

export default EditOrder;
