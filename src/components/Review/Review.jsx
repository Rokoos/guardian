import { useContext, useState } from "react";
import { FiStar } from "react-icons/fi";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import DeleteReview from "./DeleteReview";
import EditReview from "./EditReview";
import StarRatings from "../StarRatings";

const Review = ({
  person,
  setPerson,
  setShowModal1,
  setShowModal2,
  // setShowModal,
  showModal1,
  showModal2,
  // showModal,
  // modalType,
  // setModalType,
  reviewText,
  setReviewText,
  stars,
  setStars,
  rev,
}) => {
  const { user, isAdmin } = useContext(UserContext);
  const { showModal, modalType, setModalType } = useContext(ModalContext);
  return (
    <div
      className={`w-full  flex flex-col items-start justify-center  border-b-2 border-coral-red ${
        reviewText.length > 0 && "pb-2"
      }  mt-4`}
    >
      {rev.stars != null && (
        <div className="flex w-full   items-center justify-center  ">
          <div className="flex gap-1  mb-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex justify-center">
                <FiStar
                  size={25}
                  strokeWidth={0}
                  fill={index + 1 <= rev.stars ? "gold" : "#D6DBDF"}
                  // cursor="pointer"
                  className="star "
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <span className="w-full text-wrap text-gray-700 mb-2">{rev.text}</span>
      <span className="mb-4 italic ">
        <span className="text-gray-700 text-sm">Dodano przez: </span>
        <Link
          to={`/profile/${rev.reviewedBy._id}`}
          className="font-bold text-gray-800 ml-2"
        >
          {" "}
          {`${rev.reviewedBy.name} ${rev.reviewedBy.surname}`}
        </Link>{" "}
      </span>
      {(rev.reviewedBy._id === user._id || isAdmin) && (
        <div className="flex flex-row w-full justify-between mb-2 ">
          <Modal
            title="Edytuj"
            style=" bg-yellow-500 rounded-lg text-white w-[6.5rem] "
            // showModal={showModal1}
            showModal={modalType === "updateReview" && showModal}
            // setShowModal={setShowModal1}
            modalName="updateReview"
            modalStyle="max-w-[40rem]"
          >
            <div className="flex flex-col items-center w-full ">
              <h4 className="mb-2 my-2 font-bold text-gray-700 font-montserrat">
                Edytuj Opinię
              </h4>

              <EditReview
                review={rev}
                reviewText={reviewText}
                setReviewText={setReviewText}
                stars={stars}
                setStars={setStars}
                setPerson={setPerson}
                person={person}
                // setShowModal={setShowModal1}
                // setShowModal={setShowModal}
                // setModalType={setModalType}
              />
            </div>
          </Modal>
          <Modal
            title="Usuń"
            style=" bg-red-500 rounded-lg text-white w-[6rem]  "
            // btnTitle={btnTitle}
            // btnNo2Text="Delete"
            // btnNo2Style="bg-red-500"
            // setShowModal={setShowModal2}
            // showModal={showModal2}
            showModal={modalType === "deleteReview" && showModal}
            modalName="deleteReview"
            modalStyle="max-w-[40rem]"
          >
            <div className="flex flex-col items-center">
              <span className="mt-2 font-bold text-gray-700 font-montserrat">
                Czy na pewno ?
              </span>
              <DeleteReview
                review={rev}
                setPerson={setPerson}
                person={person}
                setStars={setStars}
                // setShowModal={setShowModal2}
                btnNo2Text="Usuń"
                btnNo2Style="bg-red-500 "
                setModalType={setModalType}
              />
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Review;
