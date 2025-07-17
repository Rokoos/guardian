import { Link } from "react-router-dom";
import { getCategory } from "../../utils";
import { IoMdPin } from "react-icons/io";
import { FaSackDollar } from "react-icons/fa6";
import momment from "moment";
const Order = ({ item }) => {
  // console.log("item", item);
  const {
    location,
    _id,
    urgent,
    category,
    year,
    description,
    photos,
    numberOfKids,
    age,
    hourlyRate,
    createdAt,
  } = item;
  return (
    <Link to={`/order/${_id}`} className=" w-full flex flex-col items-center ">
      <div className="w-full flex flex-col items-center p-2 border border-coral-red text-gray-700 rounded-lg mb-4 cursor-pointer">
        {urgent ? (
          <span className="ml-2 font-bold text-red-700">PILNE!</span>
        ) : (
          <span className="text-transparent">PILNE</span>
        )}
        <div className="flex justify-center">
          <span className="underline text-center mb-2">
            {getCategory(category)}
          </span>
        </div>

        {category === 1 ? (
          <span className="mx-2">Liczba dzieci: {numberOfKids}</span>
        ) : (
          <span className="mx-2">Wiek: {age[0]}</span>
        )}

        <div className=" flex flex-row justify-evenly"></div>
        <p className="my-2 text-sm">{description.substring(0, 40)}...</p>
        <div className="flex w-full justify-center items-center mt-1 ">
          <FaSackDollar className="h-4 w-4 mr-1 text-coral-red" />
          <span>{`Max stawka ${hourlyRate} PLN/h`}</span>
        </div>
        <div className="flex w-full justify-center items-center mt-1 ">
          <IoMdPin className="h-4 w-4 mr-1 text-coral-red" />
          <span>{location}</span>
        </div>
        <div>
          <span className="text-sm">
            Dodano: {momment(createdAt).format("L")}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Order;
