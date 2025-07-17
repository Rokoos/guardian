import { useEffect, useCallback, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getOrder } from "../../api";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { getCategory, mobileFormat } from "../../utils";
import { offers } from "../../constants";
import momment from "moment";

import Button from "../Button";
import Loader from "../Loader";

const SingleOrder = () => {
  console.log("offers", offers);
  let navigate = useNavigate();
  const [order, setOrder] = useState(null);
  console.log("order", order);
  const { user, isLoading, setIsLoading } = useContext(UserContext);
  const token = JSON.parse(localStorage.getItem("nannyTkn"));
  const { id } = useParams();
  // console.log("id", id);
  console.log("isLoading", isLoading);
  const fetchOrder = useCallback(() => {
    // setIsLoading(true);
    // getOrder(token, id)
    //   .then((res) => {
    //     setOrder(res.data);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data.message);
    //     console.log("error", error.response.data.message);
    //     setIsLoading(false);
    //     navigate("/orders");
    //   });
    let singleOffer = offers.find((el) => el._id === id);
    console.log("singleOrder", singleOffer);
    setOrder(singleOffer);
  }, []);
  useEffect(() => {
    fetchOrder();
    // if (!user) toast.warning("Zaloguj się by zareagować na zlecenie");
  }, [fetchOrder]);
  if (!order || isLoading) {
    return <Loader />;
  } else {
    return (
      <div
        className=" pt-10  md:mt-20   w-full  mx-auto flex 
    flex-col items-center overflow-y-scroll mb-24 "
      >
        <h2 className="mb-4 text-coral-red text-3xl font-bold">Zlecenie</h2>

        <div className="flex flex-col items-center text-sm italic text-gray-500">
          <span>Dodane {momment(order.createdAt).format("L")} przez </span>
          <Link
            to={`/profile/${order.addedBy._id}`}
            className=" text-sm  text-gray-700"
          >{`${order.addedBy.name} ${order.addedBy.surname}`}</Link>
        </div>

        {/* Category */}
        {order.urgent && (
          <div className="my-2 flex justify-center w-[16rem] md:w-[20rem] ">
            <h4 className=" block text-sm font-bold  leading-6 text-red-700 mt-2">
              PILNE!
            </h4>
          </div>
        )}
        {/* Category */}

        <div className="mt-4 mb-2 w-[16rem] md:w-[20rem] ">
          <label
            htmlFor="category"
            className=" block text-sm font-bold  leading-6 text-coral-red mt-2"
          >
            Kategoria
          </label>
          <div className="flex justify-center my-2">
            <h4 className="  text-gray-700 text-sm">
              {getCategory(order.category)}
            </h4>
          </div>
        </div>

        {/* NumberOfKids */}
        {order.category === 1 && (
          <div className="my-2 w-[16rem] md:w-[20rem] ">
            <label
              htmlFor="category"
              className=" block text-sm font-bold  leading-6 text-coral-red mt-2"
            >
              Liczba dzieci
            </label>
            <div className="flex justify-center my-2">
              <span className="  text-gray-700 text-sm">
                {order.numberOfKids}
              </span>
            </div>
          </div>
        )}
        {/*  */}
        {order.age.map((a, i) => (
          <div key={i} className="my-2 w-[16rem] md:w-[20rem] ">
            <label
              htmlFor="category"
              className=" block text-sm font-bold  leading-6 text-coral-red mt-2"
            >
              {`${order.category === 1 ? `Wiek dziecka ${i + 1}` : "Wiek"}`}
            </label>
            <div className="flex justify-center my-2">
              <span className="  text-gray-700 text-sm">{a}</span>
            </div>
          </div>
        ))}

        {/*  */}
        {order.category == 3 && (
          <div className="mt-4 mb-2 w-[16rem] md:w-[20rem] ">
            <label
              htmlFor="category"
              className=" block text-sm font-bold  leading-6 text-coral-red mt-2"
            >
              Stopień niepełnosprawności
            </label>
            <div className="flex justify-center my-2">
              <h4 className="  text-gray-700 text-sm">
                {order.disabilityLevel}
              </h4>
            </div>
          </div>
        )}

        {/*  */}
        <div className="mb-2 w-[16rem] md:w-[20rem]  ">
          <label
            htmlFor="category"
            className=" block text-sm font-bold  leading-6 text-coral-red mt-2"
          >
            Opis zlecenia
          </label>
          <div className="flex justify-center my-2">
            <span className="  text-gray-700 text-sm text-justify">
              {order.description}
            </span>
          </div>
        </div>
        {/*HourlyRate  */}
        <div className="my-2 w-[16rem] md:w-[20rem] ">
          <label
            htmlFor="category"
            className=" block text-sm font-bold  leading-6 text-coral-red "
          >
            Max stawka godzinowa
          </label>
          <div className="flex justify-center mt-4">
            <span className="  text-gray-700 text-sm text-justify">
              {order.hourlyRate} PLN/h
            </span>
          </div>
        </div>
        {/* Location */}
        <div className={`my-2 w-[16rem] md:w-[20rem] ${!user && "mb-20"}`}>
          <label
            htmlFor="category"
            className=" block text-sm font-bold  leading-6 text-coral-red mt-2"
          >
            Lokalizacja
          </label>
          <div className="flex justify-center my-2">
            <span className="text-gray-700 text-sm mr-1 ">
              {order.location}
            </span>
          </div>
        </div>
        {/* Contact*/}
        {user && (
          <div className="my-2 w-[16rem] md:w-[20rem] ">
            <label
              htmlFor="category"
              className=" block text-sm font-bold  leading-6 text-coral-red mt-2"
            >
              Telefon
            </label>
            <div className="flex justify-center my-2">
              <span className="text-gray-700 text-sm mr-1 ">
                {/* {order?.mobile && mobileFormat(order.mobile)} */}
                {order.mobile}
              </span>
            </div>
          </div>
        )}
        {/*  */}
        {user && order.addedBy._id === user._id && (
          <>
            <Link
              className={`mt-4 ${
                order.reactions.length > 0 ? "mb-4" : "mb-6"
              } `}
              to={`/editOrder/${order._id}`}
            >
              <Button label="Edytuj zlecenie" />
            </Link>
            {/*  {order.reactions.length > 0 && (
              <div className="flex flex-col items-center">
                <span>Reakcje</span>
                {order.reactions.map((el, i) => (
                  <Link to={`/profile/${el}`} key={i}>
                    {el}
                  </Link>
                ))}
              </div>
            )} */}
            {order.reactions.length > 0 && (
              <span className="text-gray-700 mb-4 underline">Reakcje</span>
            )}
            {order.reactions.length > 0 && (
              <div className="w-full max-w-[20rem] ">
                {order.reactions.map((el) => (
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
            )}
          </>
        )}
        {user && order.addedBy && order.addedBy._id !== user._id && (
          <>
            <Link className="mt-4 mb-10 " to={`/editOrder/${order._id}`}>
              <Button label="Jestem zainteresowany" />
            </Link>
          </>
        )}
      </div>
    );
  }
};

export default SingleOrder;
