import { useContext } from "react";
import { addReview } from "../../api";
import { toast } from "react-toastify";
import StarRatings from "../StarRatings";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";

const AddReview = ({
  setPerson,
  person,
  reviewText,
  setReviewText,
  stars,
  setStars,
  nannyId,
}) => {
  const { user } = useContext(UserContext);
  const { setShowModal, setModalType } = useContext(ModalContext);
  // console.log("stars", stars);
  const handleReview = () => {
    if (user) {
      const authtoken = JSON.parse(localStorage.getItem("nannyTkn"));
      let data = {
        email: person.email,
        subject: `${user.name} ${user.surname}`,
        reviewedBy: user._id,
        nannyId,
        stars,
        text: reviewText,
      };

      addReview(authtoken, data)
        .then((res) => {
          setPerson({
            ...person,
            reviewsStarsAverage: res.data.averageStars,
            reviews: res.data.reviews,
          });
          toast.success(res.data.message, {
            autoClose: 2000,
          });
          setShowModal(false);
          setModalType("");
          setReviewText("");
          setStars(null);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setShowModal(false);
          setModalType("");
          setReviewText("");
          setStars(null);
        });
    }
  };
  return (
    <div className=" w-full  flex flex-col items-center justify-center ">
      <h4 className="font-bold text-gray-700 font-montserrat mt-4">
        Dodaj Opinię
      </h4>
      <StarRatings stars={stars} setStars={setStars} />
      <textarea
        onChange={(e) => setReviewText(e.target.value)}
        rows="5"
        className=" w-full rounded-lg border border-gray-500  p-2.5 text-gray-800 placeholder-gray-400  text-sm"
        placeholder="Twoja opinia..."
      ></textarea>
      <div className="flex flex-col items-center">
        <span
          className={`${
            reviewText.length <= 500
              ? "text-gray-700 text-sm"
              : "text-red-700 text-sm"
          } pt-2`}
        >
          {reviewText.length} z 500
        </span>
      </div>
      <div className="flex items-center justify-around  rounded  w-full my-4">
        <button
          className="bg-gray-500 border border-transparent rounded-lg text-white p-2 w-[6.5rem]  hover:border-gray-500 hover:bg-white hover:text-gray-500 transition duration-200 ease-in  "
          type="button"
          onClick={() => {
            setModalType("");
            setShowModal(false);
            setStars(null);
            setReviewText("");
          }}
        >
          Anuluj
        </button>
        <button
          className="rounded-lg border border-transparent bg-green-500 text-white p-2 w-[6.5rem]  hover:border-green-500 hover:bg-white hover:text-green-500 transition duration-200 ease-in "
          type="button"
          onClick={() => handleReview()}
        >
          Dodaj
        </button>
      </div>
    </div>
  );
};

export default AddReview;
