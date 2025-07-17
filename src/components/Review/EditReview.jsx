import { useEffect, useState, useContext } from "react";
import { deleteReview, updateReview } from "../../api";
import { charNumber } from "../../utils";
import { toast } from "react-toastify";
import StarRatings from "../StarRatings";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";

const EditReview = ({
  setPerson,
  person,
  // setShowModal,
  stars,
  setStars,
  reviewText,
  setReviewText,
  // setModalType,
  review,
  userId,
}) => {
  const { user } = useContext(UserContext);
  // console.log("user", user);
  const { setModalType, setShowModal } = useContext(ModalContext);
  useEffect(() => {
    setReviewText(review.text);
    setStars(review.stars);
  }, []);

  const handleUpdate = () => {
    if (user) {
      const authtoken = JSON.parse(localStorage.getItem("nannyTkn"));

      let data = {
        reviewedBy: user._id,
        id: review._id,
        text: reviewText,
        nannyId: review.nannyId,
        stars,
      };
      updateReview(authtoken, data)
        .then((res) => {
          setPerson({
            ...person,
            reviews: res.data.reviews,
            reviewsStarsAverage: res.data.averageStars,
          });
          toast.success(res.data.message, { autoClose: 2000 });
          setStars(null);
          setShowModal(false);
          setModalType("");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setShowModal(false);
          setModalType("");
        });
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center   w-full">
      <StarRatings stars={stars} setStars={setStars} />
      <textarea
        rows="5"
        onChange={(e) => setReviewText(e.target.value)}
        value={reviewText}
        className=" w-full rounded-lg border border-gray-400 p-2.5 text-gray-800 placeholder-gray-400  text-sm"
        placeholder="Twoja opinia..."
        // disabled={reviewText.length == 500}
      ></textarea>

      <div className="flex flex-col items-center">
        <span
          className={`${
            reviewText.length <= 500 ? "text-gray-700" : "text-red-700 "
          } pt-2`}
        >
          {reviewText.length} of 500
        </span>
      </div>

      <div className="flex items-center justify-around p-6 rounded  w-full">
        <button
          className="bg-gray-500 rounded-lg text-white p-2 w-[5.5rem] ml-1 border hover:border-gray-500 hover:bg-white hover:text-gray-500 duration-150 ease-out "
          type="button"
          onClick={() => {
            setModalType("");
            setShowModal(false);
          }}
        >
          Anuluj
        </button>
        <button
          className="bg-green-500 rounded-lg text-white p-2 w-[5.5rem] border hover:border-green-500 hover:bg-white hover:text-green-500 duration-150 ease-out"
          type="button"
          onClick={() => handleUpdate()}
        >
          Zapisz
        </button>

        {/*  <button
          className="bg-red-500 rounded-lg text-white p-2 w-[5.5rem] mr-1"
          type="button"
          onClick={() => {
            setShowModal(false);
            handleDelete();
          }}
        >
          Delete
        </button> */}
      </div>
    </div>
  );
};

export default EditReview;
