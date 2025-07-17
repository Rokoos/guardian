import { useEffect, useState, useCallback, useContext, useRef } from "react";

import { getUsers, getFilteredUsers } from "../api";
import Nanny from "./Nanny";
import moment from "moment";
import { UserContext } from "../context/UserContext";
import { ModalContext } from "../context/ModalContext";
import Loader from "./Loader";
import Button from "./Button";
import Modal from "./Modal";
import Filters from "./Filters";
import Pagination from "./Pagination";

const Nannys = () => {
  const token = JSON.parse(localStorage.getItem("nannyTkn"));
  const { setShowModal, showModal, modalType, setModalType } =
    useContext(ModalContext);
  const scroller = useRef(null);
  // const [arr, setArr] = useState([]);
  // console.log("arr", arr);
  // const [showModal, setShowModal] = useState(false);
  // const [modalType, setModalType] = useState("");
  const [page, setPage] = useState(1);
  // console.log("page", page);
  const {
    user,
    isLoading,
    setIsLoading,
    filters,
    setFilters,
    users,
    setUsers,
    results,
    setResults,
  } = useContext(UserContext);

  // console.log("results", results);

  // console.log("isLoading", isLoading);
  // console.log("users", users);
  // console.log("nannys", moment(arr[0].birthday.format("YYYY/MM/DD")));
  // console.log(arr);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const fetchUsers = useCallback(() => {
    setIsLoading(true);
    // console.log("filters", filters);

    getFilteredUsers(filters, page)
      .then((res) => {
        // console.log("res.data", res.data.users);
        setResults(res.data.results);
        setUsers(res.data.users);
        // if (user && user._id) {
        //   setUsers(res.data.users.filter((nanny) => nanny._id !== user._id));
        // } else {
        //   setUsers(res.data.users);
        // }

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [page, user, filters]);

  useEffect(() => {
    fetchUsers();
    // setArr(theNannys(10));
  }, [fetchUsers]);

  return (
    <div className="h-[100vh] overflow-y-scroll flex flex-1 flex-col mb-20 md:mb-0">
      <div className="w-full  fixed z-10 flex justify-center mt-4 md:mt-20">
        <Modal
          // showModal={modalType === "filters" && showModal}
          // setShowModal={setShowModal}
          title="Filters"
          style=" bg-coral-red w-[12rem] text-white p-4 -mt-18  rounded-full cursor-pointer"
          modalStyle="w-[90vw] mx-auto max-w-[30rem]"
          modalName="filters"
          showModal={modalType === "filters" && showModal}
          // setModalType={setModalType}
        >
          <Filters setPage={setPage} />
        </Modal>
      </div>

      {users.length === 0 && !isLoading && (
        <div className="flex justify-center">
          <h4 className=" mt-40 md:mt-48 ">Sorry, no matches found!</h4>
        </div>
      )}

      <div
        // style={{ overflowX: "hidden", overflowY: "auto" }}
        // className="w-full flex  flex-col   justify-center items-center  md:flex-row  p-5 mt-16   mb-20  md:mt-40 bg-violet-600"
        className="w-full max-w-[1000px] m-auto grid place-items-center grid-cols-1 md:grid-cols-2 p-5 mt-16    md:mt-40  "
      >
        {users.length > 0 &&
          users.map((item, index) => {
            return <Nanny key={item._id} item={item} />;
          })}
      </div>
      {!isLoading && results?.numberOfPages > 1 && (
        <Pagination results={results} page={page} setPage={setPage} />
      )}
    </div>
  );
};

export default Nannys;
