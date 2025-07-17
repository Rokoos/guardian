import { useContext, useState } from "react";
import Button from "./Button";
import arrowRight from "../assets/icons/arrow-right.svg";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { ModalContext } from "../context/ModalContext";
import Modal from "./Modal";
import TermsConditions from "./TermsConditions";

const Signup = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading } = useContext(UserContext);
  const { modalType, showModal } = useContext(ModalContext);
  const [agreement, setAgreement] = useState(false);
  // console.log("agreement", agreement);
  // console.log("isLoading", isLoading);
  let navigate = useNavigate();
  const handleAgreement = () => {
    setAgreement(!agreement);
  };

  const handleSubmit = (e) => {
    if (!agreement) return;
    e.preventDefault();
    setIsLoading(true);
    const user = {
      name,
      surname,
      email,
      role,
      password,
    };

    signup(user)
      .then((data) => {
        // console.log("data", data.data.message);
        setIsLoading(false);

        toast.success(data.data.message);
        navigate("/signin");
      })
      .catch((error) => {
        // console.log("error", error.response.data.message);
        toast.error(error.response.data.message);
        setIsLoading(false);
      });
  };
  return (
    <div
      className=" h-[100vh] w-[70%] mx-auto flex md:mt-20
    flex-col justify-center items-center"
    >
      {}
      <h2 className="mb-4 text-coral-red text-3xl font-bold">Rejestracja</h2>

      <div>
        <div className="mb-2 mt-2">
          <div className="flex items-center justify-center mb-4 ">
            <input
              onChange={(e) => setRole(e.target.value)}
              id="default-radio-1"
              type="radio"
              value="parent"
              name="default-radio"
              className="w-4 h-4 checkbox appearance-none border border-coral-red rounded-full checked:bg-coral-red "
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-coral-red cursor-pointer"
            >
              Szukam opiekuna
            </label>
          </div>
          <div className="flex items-center justify-center ">
            <input
              onChange={(e) => setRole(e.target.value)}
              id="default-radio-2"
              type="radio"
              value="nanny"
              name="default-radio"
              className="w-4 h-4 checkbox appearance-none border border-coral-red rounded-full checked:bg-coral-red"
            />
            <label
              htmlFor="default-radio-2"
              className="ms-2 text-sm font-medium text-coral-red cursor-pointer"
            >
              Jestem opiekunem
            </label>
          </div>
        </div>
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
            id="name"
            className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-coral-red text-sm sm:leading-6"
            placeholder="Jan"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            id="surname"
            className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-coral-red text-sm sm:leading-6"
            placeholder="Kowalski"
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <label
          htmlFor="email"
          className=" block text-sm font-bold  leading-6 text-coral-red"
        >
          Email
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <input
            autoComplete="new-password"
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-coral-red text-sm sm:leading-6"
            placeholder="jankowalski@test.pl"
            onChange={(e) => setEmail(e.target.value)}
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
            autoComplete="new-password"
            type="password"
            name="password"
            id="password"
            className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red text-sm sm:leading-6"
            placeholder="min. 6 znaków"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col  items-center  mt-6 ">
        <div className="flex  items-center gap-2 mb-2 ">
          <input
            checked={agreement}
            onChange={handleAgreement}
            type="checkbox"
            id="some_id"
            className="
    relative peer shrink-0
    appearance-none w-4 h-4 border-2 border-coral-red rounded-sm bg-white
    mt-1
    checked:bg-coral-red checked:border-0"
          />
          <label
            htmlFor="some_id"
            className="text-sm cursor-pointer text-gray-500"
          >
            Zapoznałem się i akceptuję
          </label>
        </div>
        <Modal
          title="Warunki Korzystania z Serwisu"
          style="  text-coral-red underline text-sm w-full "
          modalName="policy"
          showModal={modalType === "policy" && showModal}
          modalStyle=" max-w-[40rem] "
        >
          <TermsConditions />
        </Modal>
      </div>
      <div onClick={handleSubmit}>
        <Button
          label="Zarejestruj"
          btnStyle="mt-6 mb-20"
          iconUrl={arrowRight}
        />
      </div>
    </div>
  );
};

export default Signup;
