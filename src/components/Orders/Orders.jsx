import { useState, useCallback, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import { getFilteredOrders, getOrders } from "../../api";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import Filters from "../Filters";
import Pagination from "../Pagination";
import Order from "./Order";
import { offers } from "../../constants";
const Orders = () => {
  const { user, isLoading, setIsLoading, filters } = useContext(UserContext);
  const { modalType, showModal } = useContext(ModalContext);
  const [arr, setArr] = useState([]);
  // console.log("arr", arr);

  const [page, setPage] = useState(1);
  // console.log("page", page);

  const [results, setResults] = useState({});
  const [limit, setLimit] = useState(5);

  const fetchOffers = useCallback(() => {
    // setIsLoading(true);
    // getOrders()
    //   .then((res) => {
    //     setArr(res.data);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //     setIsLoading(false);
    //   });
    setArr(offers);

    // setArr(offers);
    // getFilteredUsers(filters, page)
    //   .then((res) => {
    //     console.log("res.data", res.data.results);
    //     setResults(res.data.results);
    //     if (user && user._id) {
    //       setArr(res.data.users.filter((nanny) => nanny._id !== user._id));
    //     } else {
    //       setArr(res.data.users);
    //     }

    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setIsLoading(false);
    //   });
  }, [setIsLoading, page, user]);

  useEffect(() => {
    fetchOffers();

    // setArr(theNannys(10));
  }, [fetchOffers]);
  return (
    <div className="h-[100vh] overflow-y-scroll flex flex-1 flex-col mb-20 md:mb-0">
      <div className="w-full  fixed z-10 flex self-center justify-evenly items-center mt-10 md:mt-24 max-w-[600px] ">
        <Modal
          // showModal={modalType === "filters" && showModal}
          // setShowModal={setShowModal}
          title="Filtry"
          style=" bg-coral-red w-[6rem] text-white  mt-2  rounded-full cursor-pointer"
          modalStyle="w-[90vw] mx-auto max-w-[30rem]"
          modalName="filters"
          showModal={modalType === "filters" && showModal}
          // setModalType={setModalType}
        >
          <Filters setPage={setPage} />
        </Modal>
        {user && (
          <Link
            to="/addOrder"
            className="bg-coral-red p-1 px-4  h-full  text-white rounded-full mt-2"
          >
            Dodaj zlecenie
          </Link>
        )}
      </div>

      <div className="w-full flex  xl:flex-row flex-col xl:mt-60  justify-center items-center   p-2 mt-6  absolute  ">
        {arr.length === 0 && !isLoading && <h4>Sorry, no matches found!</h4>}
        <div className="w-full max-w-[1200px] m-auto grid place-items-center grid-cols-1 md:grid-cols-2  gap-2 p-5 mt-16    md:mt-40  ">
          {arr.length > 0 &&
            arr.map((item, index) => {
              return <Order key={item._id} item={item} />;
            })}
        </div>
        <div className="h-[100px]  md:hidden "></div>
      </div>
    </div>
  );
};

export default Orders;
