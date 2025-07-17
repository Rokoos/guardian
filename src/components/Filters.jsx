import { useState, useContext } from "react";
import { nationalities, days, workLocations, categories } from "../constants";
import StarRatings from "./StarRatings";
import Switcher from "./Switcher";
import { useLocation } from "react-router-dom";
import { getUsers, getFilteredUsers } from "../api";
import { IoMdSunny, IoIosMoon } from "react-icons/io";
import { UserContext } from "../context/UserContext";
import { ModalContext } from "../context/ModalContext";

const Filters = ({ setPage }) => {
  const { filters, setFilters, setUsers, setResults, user } =
    useContext(UserContext);
  const { setShowModal, setModalType } = useContext(ModalContext);
  const [category, setCategory] = useState("");
  // console.log("cat", category);
  const [numberOfKids, setNumberOfKids] = useState(1);
  // console.log("numOfKids", numberOfKids);
  const [age, setAge] = useState([]);
  // console.log("age", age);
  const [urgent, setUrgent] = useState(false);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [stars, setStars] = useState(0);
  const [location, setLocation] = useState("");
  // let location = useLocation();
  // console.log("location", location.pathname);
  // const route = location.pathname.split("/")[1];

  // console.log("route", route);

  // console.log(maxAge);
  // const handleClick = (item) => {
  //   setFilters({
  //     ...filters,
  //     workingDays: filters.workingDays.map((day) =>
  //       day.d === item.d ? { ...day, av: !day.av } : day
  //     ),
  //   });
  // };

  // const handleShift = (item, shift) => {
  //   setFilters({
  //     ...filters,
  //     workingDays: filters.workingDays.map((day) =>
  //       day.d === item.d
  //         ? {
  //             ...day,
  //             [shift]: !day[shift],
  //           }
  //         : day
  //     ),
  //   });
  // };
  // const shiftColors = (shift) => {
  //   if (shift) {
  //     return "bg-green-600";
  //   } else if (!shift) {
  //     return "bg-coral-red";
  //   }
  // };
  // const checkDays = () => {
  //   if (filters?.workingDays) {
  //     return filters.workingDays.filter((el) => el.av);
  //   } else {
  //     return [];
  //   }
  // };

  const handleSearch = () => {
    setPage(1);
    let data = {
      age: filters.age,
      hourRate: filters.hourRate,
      userId: user ? user._id : "",
      role: filters.role,
    };

    if (filters.nationality !== "" && filters.nationality !== "") {
      data.nationality = filters.nationality;
    }
    if (filters.stars !== 0) {
      data.stars = filters.stars;
    }
    // if (route === "nannys") {
    //   if (checkDays().length > 0) {
    //     data.workingDays = checkDays();
    //   }
    //   if (filters.locations.length > 0) {
    //     data.locations = filters.locations;
    //   }
    // }

    // getFilteredUsers(data, 1)
    //   .then((res) => {
    //     setUsers(res.data.users);
    //     setResults(res.data.results);
    //     setShowModal(false);
    //     setModalType("");
    //   })
    //   .catch((error) => console.log(error));
  };

  const addLocations = (e) => {
    // console.log("target", e.target.value);
    if (e.target.value !== "Choose") {
      // setLocations([...locations, e.target.value]);
      if (filters["locations"]) {
        setFilters({
          ...filters,
          locations: [...filters.locations, e.target.value],
        });
      } else {
        setFilters({
          ...filters,
          locations: [e.target.value],
        });
      }
    }
  };

  const deleteLocation = (i) => {
    setFilters({
      ...filters,
      locations: filters.locations.filter((_, index) => index !== i),
    });
  };
  const filterLocations = (arr1, arr2) => {
    if (arr2["locations"]) {
      return arr1.filter(
        (el) => !arr2.locations.filter((y) => y === el).length
      );
    } else {
      return arr1;
    }
  };

  // const resetFilters = () => {
  //   if (route === "nannys") {
  //     setFilters({
  //       userId: user ? user._id : "",
  //       role: "nanny",
  //       age: 65,
  //       hourRate: 60,
  //       nationality: "",
  //       locations: [],
  //       workingDays: days,
  //       stars: 0,
  //     });
  //   } else if (route === "parents") {
  //     setFilters({
  //       userId: user ? user._id : "",
  //       role: "parent",
  //     });
  //   }
  // };

  const handleCategory = (e) => {
    let val = e.target.value;
    if (val === "Wybierz") {
      return;
    } else {
      setCategory(val);
    }
    setNumberOfKids(1);
    setAge([]);
  };
  const handleCheckboxChange = () => setUrgent((previous) => !previous);
  //  const handleAge = (e, i) => {
  //   if (numberOfKids === 1) {
  //     setAge([e.target.value]);
  //   } else {
  //     let newAge = [...age];
  //     newAge[i] = e.target.value;
  //     setAge(newAge);
  //   }
  // };
  return (
    <div className="flex flex-col  items-center w-full  h-[60vh] overflow-y-scroll mb-8 ">
      <div className="relative flex flex-row items-center w-full ">
        <div
          className="absolute w-7 h-7 flex justify-center cursor-pointer bg-red-700  text-white rounded-full top-0 right-0"
          onClick={() => {
            setModalType("");
            setShowModal(false);
          }}
        >
          <span className="">x</span>
        </div>
      </div>
      <h4 className="text-coral-red font-bold">FILTRY</h4>
      {/* Category//////////// */}
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
            <option>Wybierz</option>
            {categories.map((n, index) => (
              <option value={n.value} key={index}>
                {n.text}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Number OfKids */}

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
              onChange={(e) => setNumberOfKids(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Age */}
      {category != 1 && (
        <div className="mt-4 mb-4 w-[16rem] md:w-[20rem]  ">
          <label
            htmlFor="locations"
            className=" block text-sm font-bold  leading-6 text-coral-red mb-2"
          >
            Wiek
          </label>
          <div className="flex flex-col justify-between p-2 items-center ">
            <span className="mb-2 text-gray-700">
              {age[0] || (category == 2 ? "60" : "18")}
            </span>
            <input
              id="numberOfKids"
              className="range block w-[80%] accent-coral-red cursor-pointer"
              type="range"
              value={age[0] || 1}
              min={category == 2 ? "60" : "18"}
              max="100"
              onChange={(e) => setAge([e.target.value])}
            />
          </div>
        </div>
      )}

      {/* Hour Rate */}
      <div className=" mt-2 mb-2 w-[16rem] md:w-[20rem]  ">
        <label className=" block text-sm font-bold  leading-6 text-coral-red mt-3 mb-3">
          Stawka godzinowa
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
      <Switcher
        isChecked={urgent}
        handleCheckboxChange={handleCheckboxChange}
      />
      <div className=" mt-2 mb-2 w-[16rem] md:w-[20rem]  ">
        <label
          htmlFor="surname"
          className=" block text-sm font-bold  leading-6 text-coral-red"
        >
          Lokalizacja
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <input
            autoComplete="new-password"
            type="surname"
            name="surname"
            id="surname"
            className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-coral-red text-sm sm:leading-6"
            placeholder="np. Marki"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
      {/* /////////////////Age///////////////
      {route === "nannys" && (
        <div className="mt-6 w-full max-w-[20rem]  ">
          <label htmlFor="age" className="text-gray-700">
            Set Max Age
          </label>
          <div className="flex flex-col justify-between p-2 items-center ">
            <span className="mb-2 text-gray-700">{filters.age}</span>
            <input
              id="age"
              className="range   accent-coral-red cursor-pointer"
              type="range"
              value={filters.age}
              min="20"
              max="65"
              // onChange={(e) => setMaxAge(Number(e.target.value))}
              onChange={(e) =>
                setFilters({ ...filters, age: Number(e.target.value) })
              }
            />
          </div>
        </div>
      )} */}
      {/* ////////////////////HourRate//////////////
      {route === "nannys" && (
        <div className="mt-6 w-full max-w-[20rem] ">
          <label htmlFor="hourlyRate" className="text-gray-700 ">
            Set Max Week Hourly Rate{" "}
          </label>
          <div className="flex flex-col  justify-between p-2 items-center ">
            <span className="mb-2 mt-2 text-gray-700">
              {filters.hourRate} PLN
            </span>
            <input
              id="hourlyRate"
              className="range   accent-coral-red cursor-pointer"
              type="range"
              value={filters.hourRate}
              min={20}
              max={60}
              // onChange={(e) => setHourRate(Number(e.target.value))}
              onChange={(e) =>
                setFilters({ ...filters, hourRate: Number(e.target.value) })
              }
            />
          </div>
        </div>
      )} */}

      {/* ///////////Nationality///////////
      <div className="mt-6 w-full max-w-[20rem]  ">
        <label
          htmlFor="nationality"
          className="block  font-medium text-gray-700"
        >
          Nationality
        </label>
        <div className="mt-2 max-w-[13rem] mx-auto ">
          <div className="grid shrink-0 grid-cols-1 focus-within:relative">
            <select
              // onChange={(e) => setNationality(e.target.value)}
              onChange={(e) =>
                setFilters({ ...filters, nationality: e.target.value })
              }
              value={filters.nationality || "Choose"}
              id="nationality"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pl-3 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-coral-red  sm:text-sm/6 "
            >
              {nationalities.map((el, i) => (
                <option key={i}>{el}</option>
              ))}
            </select>
            <svg
              className="pointer-events-none col-start-1 row-start-1  size-5 self-center justify-self-end text-gray-500 sm:size-4"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div> */}

      {/* ///////////Work Locations///////////
      {route === "nannys" && (
        <div className="mt-4 w-full max-w-[20rem] ">
          <label
            htmlFor="locations"
            className="block  font-medium text-gray-900"
          >
            Work Locations
          </label>
          {filters?.locations && filters.locations.length > 0 && (
            <div className="flex flex-col items-center max-w-[13rem] mx-auto ">
              {filters.locations.map((loc, i) => (
                <div
                  className="w-full flex flex-row justify-between px-2 text-coral-red border-2 border-coral-red rounded-lg mb-2"
                  key={i}
                >
                  <span>{loc}</span>
                  <span
                    className="cursor-pointer"
                    onClick={() => deleteLocation(i)}
                  >
                    X
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-2 max-w-[13rem] mx-auto">
            <div className="grid shrink-0 grid-cols-1 focus-within:relative">
              <select
                onChange={addLocations}
                id="locations"
                value="Choose"
                className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pl-3 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-coral-red sm:text-sm/6"
              >
                <option>Choose</option>
                {filterLocations(workLocations, filters).map((el, i) => (
                  <option key={i}>{el}</option>
                ))}
              </select>
              <svg
                className="pointer-events-none col-start-1 row-start-1  size-5 self-center justify-self-end text-gray-500 sm:size-4"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      )} */}

      {/* //////////////working Days/////////
      {route === "nannys" && (
        <div className="mt-4 w-full max-w-[20rem] ">
          <label
            htmlFor="schedule"
            className="block  font-medium text-gray-700"
          >
            Work Schedule
          </label>
          <div
            id="schedule"
            className="mt-4 p-4 rounded-lg border-2  border-coral-red w-[100%]"
          >
            <div className="flex flex-col gap-2 ">
              <div className="flex flex-row justify-between text-sm ">
                <span className="text-gray-700">Weekday</span>
                <span className="text-gray-700">Till 8pm</span>
                <span className="text-gray-700">After 8pm</span>
              </div>
              {filters.workingDays.map((day) => (
                <div
                  key={day.d}
                  className=" flex flex-row items-center justify-between gap-2 text-white "
                >
                  <button
                    onClick={() => handleClick(day)}
                    className={`rounded-lg w-[60px] h-[33px]  ${
                      day.av ? "bg-green-600" : "bg-red-600"
                    } `}
                  >
                    {day.d}
                  </button>

                  <button
                    onClick={() => handleShift(day, "dayShift")}
                    className={`${shiftColors(
                      day.dayShift
                    )} rounded-lg w-[33px] h-[33px] flex justify-center text-xl  items-center text-white  disabled:bg-slate-400 mr-4`}
                    disabled={!day.av}
                  >
                    <IoMdSunny />
                  </button>
                  <button
                    onClick={() => handleShift(day, "nightShift")}
                    className={`${shiftColors(
                      day.nightShift
                    )} rounded-lg w-[33px]  h-[33px] flex justify-center text-xl  items-center text-white  disabled:bg-slate-400 mr-4`}
                    disabled={!day.av}
                  >
                    <IoIosMoon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}

      {/* ////////////////Rating///////////////// */}
      <div className="mt-4 mb-4 w-[16rem] md:w-[20rem]  ">
        <label
          htmlFor="category"
          className=" block text-sm font-bold  leading-6 text-coral-red mt-2"
        >
          Ocena
        </label>
        <div className=" flex justify-center">
          <StarRatings filters={filters} setFilters={setFilters} />
        </div>
      </div>
      {/* <div className="mt-4 w-full max-w-[20rem] ">
        <label htmlFor="schedule" className="block  font-medium text-gray-700">
          Rating
        </label>
        <div className=" flex justify-center">
          <StarRatings filters={filters} setFilters={setFilters} />
        </div>
      </div> */}

      <button
        // onClick={() => handleSearch()}
        className="p-2 px-4 mt-2 bg-green-500 text-white w-[10rem] rounded-lg"
      >
        Zastosuj
      </button>
      <button
        className="p-2 px-4 mt-2   bg-yellow-600 w-[10rem]  text-white rounded-lg"
        // onClick={resetFilters}
      >
        Reset
      </button>
    </div>
  );
};

export default Filters;
