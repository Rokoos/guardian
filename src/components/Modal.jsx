import { useState, useContext, useEffect } from "react";
import { deleteReview } from "../api";
import { ModalContext } from "../context/ModalContext";

export default function Modal({
  person,
  setPerson,
  children,
  isOpened,
  title,
  btnTitle,
  style,
  modalStyle,
  btnNo2Text,
  btnNo2Style,
  reviewId,
  nannyId,
  showModal,
  // setShowModal,
  stars,
  reviewText,
  user_id,
  modalName,
  // setModalType,
  // modalType,
}) {
  const { setShowModal, modalType, setModalType } = useContext(ModalContext);
  // console.log("id", reviewId, nannyId);
  // console.log("title", title);
  // console.log("person", person);

  // const handleReview = () => {
  //   // if (title === "Add Review") {
  //   //   let data = { reviewedBy: user_id, stars, text: reviewText, nannyId };
  //   //   // console.log("Add review", data);
  //   // } else if (title === "Edit") {
  //   //   console.log("Edit review");
  //   // } else if (title === "Delete") {
  //   //   deleteReview({ reviewId, nannyId }).then((res) =>
  //   //     // console.log("res.data", res.data)
  //   //     setPerson({ ...person, reviews: res.data })
  //   //   );
  //   // }
  //   deleteReview({ reviewId, nannyId }).then((res) => {
  //     console.log("res.data", res.data);
  //     setPerson({ ...person, reviews: res.data });
  //   });
  // };

  return (
    <>
      <button
        className={` text-coral-red p-1  h-full ${style} `}
        onClick={() => {
          setModalType(modalName);
          setShowModal(true);
        }}
      >
        {title}
      </button>

      {showModal ? (
        <>
          <div
            className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-full  `}
          >
            <div className={`relative w-full my-6   ${modalStyle} `}>
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
                {/*header*/}

                {/*body*/}
                <div className="flex flex-col justify-center items-center bg-white mt-5 p-2 rounded-lg ">
                  {children}
                </div>
                {/* <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div> */}
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
