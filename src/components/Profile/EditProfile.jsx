import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdSunny, IoIosMoon, IoIosCloseCircle } from "react-icons/io";
import {
  hourPayArray,
  nationalities,
  workLocations,
  hRate,
  lngsOptions,
  levelOptions,
  demoGuardians,
} from "../../constants";
import arrowRight from "../../assets/icons/arrow-right.svg";
import { currentUser, updateUser } from "../../api";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import Button from "../Button";
import PDFConverter from "../PDFConverter";
import FileUploader from "../FileUploader";
import Modal from "../Modal";
import DeleteProfile from "./DeleteProfile";

const EditProfile = () => {
  const { id } = useParams();

  let navigate = useNavigate();
  const [workingDays, setworkingDays] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(18);
  const [mobile, setMobile] = useState("");

  const [nationality, setNationality] = useState("");
  const [locations, setLocations] = useState([]);
  const [lngs, setLngs] = useState([]);
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [services, setServices] = useState([]);
  const [service, setService] = useState("");
  const [hourRates, setHourRates] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [dataFile, setDataFile] = useState("");
  const [cvUrl, setCVUrl] = useState("");
  const [recLetterUrl, setRecLetterUrl] = useState("");
  const { user } = useContext(UserContext);
  const { modalType, setShowModal, showModal } = useContext(ModalContext);

  const handlePress = (text, value) => {
    if (text === "Recommendation letter") {
      setRecLetterUrl(value);
    } else if (text === "CV") {
      setCVUrl(value);
    }
  };

  const token = JSON.parse(localStorage.getItem("nannyTkn"));
  useEffect(() => {
    // if (token) {
    //   currentUser(token)
    //     .then((res) => {
    //       setName(res.data.name);
    //       setEmail(res.data.email);
    //       setSurname(res.data.surname);
    //       if (res.data.age) setAge(res.data.age);
    //       setNationality(res.data.nationality);
    //       if (res.data.mobile) setMobile(res.data.mobile);
    //       if (res.data.locations) setLocations(res.data.locations);
    //       setServices(res.data.additionalServices);
    //       setSkills(res.data.additionalSkills);
    //       setLngs(res.data.languages);
    //       setworkingDays(res.data.workingDays);
    //       if (res.data.cvUrl) setCVUrl(res.data.cvUrl);
    //       if (res.data.recommendationLetterUrl)
    //         setRecLetterUrl(res.data.recommendationLetterUrl);
    //       res.data.hourRate.length === 0
    //         ? setHourRates(hRate)
    //         : setHourRates(res.data.hourRate);
    //       if (res.data?.photoUrl) setImageUrl(res.data.photoUrl);
    //     })
    //     .catch((error) => {
    //       toast.error(error.response.data.message);
    //     });
    // }
    let guardian = demoGuardians.find((el) => el._id === id);
    // console.log("singleOrder", guardian);
    setName(guardian.name);
    setEmail(guardian.email);
    setSurname(guardian.surname);
    if (guardian.age) setAge(guardian.age);
    setNationality(guardian.nationality);
    if (guardian.mobile) setMobile(guardian.mobile);
    if (guardian.locations) setLocations(guardian.locations);
    setServices(guardian.additionalServices);
    setSkills(guardian.additionalSkills);
    setLngs(guardian.languages);
    setworkingDays(guardian.workingDays);
    if (guardian.cvUrl) setCVUrl(guardian.cvUrl);
    if (guardian.recommendationLetterUrl)
      setRecLetterUrl(guardian.recommendationLetterUrl);
    guardian.hourRate.length === 0
      ? setHourRates(hRate)
      : setHourRates(guardian.hourRate);
    if (guardian?.photoUrl) setImageUrl(guardian.photoUrl);
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsLoading(true);

    const editedUser = {
      name,
      surname,
      email,
      mobile,
      languages: lngs,
      age,
      additionalServices: services,
      additionalSkills: skills,
      hourRate: hourRates,
      nationality,
      workingDays,
      photoUrl: imageUrl,
      recommendationLetterUrl: recLetterUrl,
      cvUrl,
      locations,
    };

    updateUser(token, user._id, editedUser)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setSurname(res.data.surname);
        setMobile(res.data.mobile);
        setLocations(res.data.locations);
        setAge(res.data.age);
        setNationality(res.data.nationality);
        setServices(res.data.additionalServices);
        setSkills(res.data.additionalSkills);
        setLngs(res.data.languages);
        setworkingDays(res.data.workingDays);
        setHourRates(res.data.hourRate);
        setImageUrl(res.data.photoUrl);
        toast.success("Edycja zakończona powodzeniem.");
        navigate(`/profile/${user._id}`);
      })
      .catch((error) => toast.error(error.message));
  };

  const handleHourRate = (i, e) => {
    let arr = [...hourRates];
    arr[i] = Number(e.target.value);
    setHourRates(arr);
  };

  const handleLanguage = (e) => setLanguage(e.target.value);
  const handleLevel = (e) => setLevel(e.target.value);
  const addLanguage = () => {
    const obj = {
      lng: language,
      level,
    };
    setLanguage("");
    setLevel("");
    setLngs([...lngs, obj]);
  };
  const removeLanguage = (index) => {
    let arr = [...lngs.filter((_, i) => i !== index)];
    setLngs(arr);
  };

  const filterLanguages = (arr1, arr2) => {
    return arr1.filter((i) => !arr2.filter((y) => y.lng === i).length);
  };

  const languageHandler = (e, index) => {
    let newArr = [...lngs];
    newArr[index]["lng"] = e.target.value;
    setLngs(newArr);
  };

  const levelHandler = (e, index) => {
    let newArr = [...lngs];
    newArr[index]["level"] = e.target.value;
    setLngs(newArr);
  };

  const handleClick = (item) => {
    setworkingDays(
      workingDays.map((day) =>
        day.d === item.d ? { ...day, av: !day.av } : day
      )
    );
  };

  const handleShift = (item, shift) => {
    setworkingDays(
      workingDays.map((day) =>
        day.d === item.d
          ? {
              ...day,
              [shift]: !day[shift],
            }
          : day
      )
    );
  };

  const shiftColors = (shift) => {
    if (shift) {
      return "bg-green-600";
    } else if (!shift) {
      return "bg-coral-red";
    }
  };

  /* locations */

  const addLocations = (e) => {
    if (e.target.value !== "Wybierz") {
      setLocations([...locations, e.target.value]);
    }
  };

  const deleteLocation = (i) => {
    setLocations(locations.filter((_, index) => index !== i));
  };
  const filterLocations = (arr1, arr2) => {
    if (arr2) {
      return arr1.filter((el) => !arr2.filter((y) => y === el).length);
    } else {
      return arr1;
    }
  };

  return (
    <div
      className=" mt-10 md:mt-20  w-full  mx-auto flex 
    flex-col items-center "
    >
      <h2 className="mb-4 text-coral-red text-3xl font-bold">Edytuj Profil</h2>
      <FileUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
      {/*  */}
      {/* Name */}
      <div className="max-w-[600px] flex flex-col items-center ">
        <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
          <label
            htmlFor="name"
            className=" block text-sm font-bold  leading-6 text-coral-red"
          >
            Imię
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <input
              autoComplete="new-password"
              type="name"
              name="name"
              value={name}
              id="name"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-coral-red sm:text-sm sm:leading-6 focus:outline-none"
              placeholder="Jane"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        {/*  */}
        {/* Surname */}
        <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
          <label
            htmlFor="surname"
            className=" block text-sm font-bold  leading-6 text-coral-red"
          >
            Nazwisko
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <input
              autoComplete="new-password"
              type="surname"
              name="surname"
              value={surname}
              id="surname"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-coral-red sm:text-sm sm:leading-6 focus:outline-none"
              placeholder="Doe"
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
        </div>
        {/*  */}
        {/* Mobile */}
        {user.role === "nanny" && (
          <div className="mt-4 mb-4 w-[16rem] md:w-[20rem] ">
            <label
              htmlFor="mobile"
              className=" block text-sm font-bold  leading-6 text-coral-red"
            >
              Kontakt
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <input
                autoComplete="new-password"
                type="text"
                name="mobile"
                value={mobile}
                id="mobile"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-coral-red sm:text-sm sm:leading-6"
                placeholder="+48 123 456 789"
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>
        )}
        {/*  */}
        {/* Age */}
        {user.role === "nanny" && (
          <div className=" mt-4 mb-4 w-[16rem] md:w-[20rem]">
            <label
              htmlFor="age"
              className=" block text-sm font-bold  leading-6 text-coral-red"
            >
              Wiek
            </label>
            <div className="flex flex-col justify-between p-2 items-center ">
              <span className="mb-2 text-gray-700">{age}</span>
              <input
                id="age"
                className="range block w-[80%] accent-coral-red cursor-pointer"
                type="range"
                value={age}
                min="18"
                max="65"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>
        )}
        {/*  */}
        {/* Nationality */}
        <div className=" mt-4 mb-4 w-[16rem] md:w-[20rem] ">
          <label
            htmlFor="age"
            className=" block text-sm font-bold  leading-6 text-coral-red mt-2"
          >
            Narodowość
          </label>
          <div className="relative mt-2 rounded-md flex justify-center">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 "></div>
            <select
              className="w-full text-gray-700 p-2 focus:outline focus:outline-2 focus:-outline-offset-2 rounded-md focus:outline-coral-red"
              onChange={(e) => setNationality(e.target.value)}
              value={nationality}
            >
              {nationalities.map((n, index) => (
                <option value={n} key={index}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/*  */}
        {/* Locations */}
        {user.role === "nanny" && (
          <div className="mt-4 mb-4 w-[16rem] md:w-[20rem]  ">
            <label
              htmlFor="locations"
              className=" block text-sm font-bold  leading-6 text-coral-red mb-2"
            >
              Lokalizacje
            </label>
            {locations && locations.length > 0 && (
              <div className="w-full flex flex-col items-center  mx-auto ">
                {locations.map((loc, i) => (
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
            <div className="mt-2  mx-auto ">
              <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                <select
                  onChange={addLocations}
                  id="locations"
                  value="Choose"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pl-3 pr-7 text-base text-gray-700 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-coral-red "
                >
                  <option>Wybierz</option>
                  {filterLocations(workLocations, locations).map((el, i) => (
                    <option value={el} key={i}>
                      {el}
                    </option>
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
        )}
        {/*  */}
        {/* CV */}
        {user.role === "nanny" && (
          <>
            <div className=" mt-4 w-[16rem] md:w-[20rem]">
              <label className=" text-sm font-bold  leading-6 text-coral-red mt-3 mb-3 ">
                CV
              </label>
            </div>
            <PDFConverter
              handlePress={handlePress}
              content={cvUrl}
              title="CV"
            />
          </>
        )}
        {/*  */}
        {/* Languages */}
        <div className=" mt-4 mb-4 w-[16rem] md:w-[20rem] ">
          <label className=" block text-sm font-bold  leading-6 text-coral-red mt-3 mb-3">
            Języki obce
          </label>

          {lngs.map((l, index) => (
            <div
              key={index}
              className="flex w-full  justify-center mb-2 items-center"
            >
              <div className="w-3/5 text-gray-700">
                <select
                  onChange={(e) => languageHandler(e, index)}
                  value={l.lng}
                >
                  {lngsOptions.map((el, i) => (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-2/5 text-gray-700">
                <select
                  onChange={(e) => levelHandler(e, index)}
                  value={l.level}
                >
                  {levelOptions.map((el, i) => (
                    <option key={i}>{el}</option>
                  ))}
                </select>
              </div>
              {/*  <div
                className="flex justify-center items-end  cursor-pointer rounded-2xl w-5 h-5 bg-red-700 text-white"
                onClick={() => removeLanguage(index)}
              >
                <span>x</span>
              </div> */}
              <div className="flex justify-center items-end  cursor-pointer rounded-2xl w-5 h-5  text-white">
                <IoIosCloseCircle
                  onClick={() => removeLanguage(index)}
                  className="w-5 h-5 text-red-700 "
                  color="red"
                />
              </div>
            </div>
          ))}
          <div>
            <div className="flex mt-3">
              <div className="mt-2 w-3/5 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                <select
                  value={language}
                  className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2  focus:ring-coral-red text-sm sm:leading-6"
                  onChange={handleLanguage}
                >
                  <option>Język</option>
                  {filterLanguages(lngsOptions, lngs).map((l, index) => (
                    <option key={index} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" mt-2 w-2/5 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                <select
                  value={level}
                  className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-2  focus:ring-coral-red text-sm sm:leading-6"
                  onChange={handleLevel}
                >
                  <option>Poziom</option>
                  {levelOptions.map((o, index) => (
                    <option key={index} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-100  flex justify-center">
              <button
                disabled={language === "" || level === ""}
                onClick={() => addLanguage()}
                className="w-50 bg-coral-red  rounded-lg px-3 py-1 mt-5 text-white"
              >
                Dodaj Język
              </button>
            </div>
          </div>
        </div>
        {/*  */}
        {/* Availability  */}
        {user.role === "nanny" && (
          <div className="  mt-4 w-[16rem] md:w-[20rem] ">
            <label className=" block text-sm font-bold  leading-6 text-coral-red mt-3">
              Dostępność
            </label>

            <div className="mt-4 p-4 rounded-lg border-2  border-coral-red w-full">
              <h4 className="text-center mb-2 text-gray-700 "> Grafik</h4>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between text-sm  text-gray-700 ">
                  <span className="ml-2">Dzień</span>
                  <span className="ml-8">Do 20:00</span>
                  <span>Po 20:00</span>
                </div>
                {workingDays.map((day) => (
                  <div
                    key={day.d}
                    className=" flex flex-row items-center w-full justify-around  text-white "
                  >
                    <div
                      onClick={() => handleClick(day)}
                      className={`rounded-lg flex justify-center items-center w-[60px] h-[33px] ${
                        day.av ? "bg-green-600" : "bg-red-600"
                      } -ml-6 md:-ml-10`}
                    >
                      {day.d}
                    </div>

                    <div
                      onClick={() => handleShift(day, "dayShift")}
                      className={`${shiftColors(
                        day.dayShift
                      )} rounded-lg w-[33px] h-[33px] flex justify-center text-xl  items-center text-white   ${
                        !day.av && "bg-slate-400"
                      } `}
                      disabled={!day.av}
                    >
                      <IoMdSunny />
                    </div>
                    <div
                      onClick={() => handleShift(day, "nightShift")}
                      className={`${shiftColors(
                        day.nightShift
                      )} rounded-lg w-[33px]  h-[33px] flex justify-center text-xl  items-center text-white  -mr-6 md:-mr-10 ${
                        !day.av && "bg-slate-400"
                      }`}
                      disabled={!day.av}
                    >
                      <IoIosMoon />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/*  */}
        {/* Hour Rate */}
        {user.role === "nanny" && (
          <div className=" mt-2 mb-2 w-[16rem] md:w-[20rem]  ">
            <label className=" block text-sm font-bold  leading-6 text-coral-red mt-3 mb-3">
              Stawka godzinowa:
            </label>
            <div className="flex flex-col  m-auto  ">
              <div className="flex flex-row justify-between text-gray-700 ">
                <div className="flex flex-col">
                  {hourPayArray.map((el, index) => (
                    <div key={index} className="h-20 flex items-center  pt-4">
                      <h4>{el}:</h4>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col ">
                  {hourRates.map((rate, index) => (
                    <div
                      key={index}
                      className="h-20 flex flex-col items-center  p-4"
                    >
                      <span className="text-sm mb-2 ">{`${rate} PLN/h`}</span>

                      <input
                        className="w-full accent-coral-red cursor-pointer"
                        type="range"
                        value={rate}
                        min="20"
                        max="60"
                        onChange={(e) => handleHourRate(index, e)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {/*  */}
        {/* Skills */}
        {user.role === "nanny" && (
          <div className=" mt-2 mb-2 w-[16rem] md:w-[20rem]  ">
            <label className=" block text-sm font-bold  leading-6 text-coral-red  mb-3">
              Dodatkowe Umiejętności
            </label>
            <div className="w-[100%] ">
              {skills.map((s, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center  border border-rose-500 rounded-2xl px-3 mb-2"
                >
                  <textarea
                    onChange={(e) => handleSkill(index, e)}
                    rows="1"
                    value={s}
                    className="w-[90%] text-gray-700"
                  ></textarea>
                  {/* <div className="flex justify-center items-end  cursor-pointer rounded-2xl w-5 h-5 bg-red-700 text-white">
                    <span onClick={() => removeSkill(index)}>x</span>
                  </div> */}
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
                  placeholder="np. gra na pianinie"
                  className="w-[90%]"
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
        )}
        {/*  */}
        {/* Services */}
        {user.role === "nanny" && (
          <div className=" mb-2 mt-4 w-[16rem] md:w-[20rem] ">
            <label className=" block text-sm font-bold  leading-6 text-coral-red mb-3">
              Dodatkowe usługi
            </label>
            <div className="w-[100%] ">
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
                  {/* <div className="flex justify-center items-end  cursor-pointer rounded-2xl w-5 h-5 bg-red-700 text-white">
                    <span onClick={() => removeService(index)}>x</span>
                  </div> */}
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
                  placeholder="np. wyprowadzenie psa"
                  className="w-[90%]"
                ></textarea>
              </div>
              <div className="w-100  flex justify-center">
                <button
                  disabled={service === ""}
                  onClick={addService}
                  className="w-50 bg-coral-red  rounded-lg px-3 py-1 mt-3 text-white"
                >
                  Dodaj usługę
                </button>
              </div>
            </div>
          </div>
        )}
        {/*  */}
        {/* Rec Letter */}
        {user.role === "nanny" && (
          <>
            <div className=" mt-4 w-[16rem] md:w-[20rem]">
              <label className=" text-sm font-bold  leading-6 text-coral-red mt-3 mb-3 ">
                List Polecający
              </label>
            </div>

            <PDFConverter
              title="Recommendation letter"
              handlePress={handlePress}
              content={recLetterUrl}
            />
          </>
        )}
        {/*  */}
        <div
        //  onClick={handleSubmit}
        >
          <Button
            label="Zapisz"
            btnStyle="mt-10 mb-4 flex mx-auto   space-y-5 md:mt-12 "
            iconUrl={arrowRight}
          />
        </div>
        <div className=" mb-40 w-[15rem] md:mb-10">
          <Modal
            title="Usuń Profil"
            style=" bg-red-800 w-full rounded-full p-4 border-2 border-red-500  hover:bg-white hover:text-red-500 transition duration-300 ease-in-out text-white "
            showModal={modalType === "userDelete" && showModal}
            setShowModal={setShowModal}
            modalName="userDelete"
            modalStyle={"max-w-[40rem]"}
          >
            <DeleteProfile id={id} email={email} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
