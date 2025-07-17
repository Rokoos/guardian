import { useContext } from "react";
import { deleteReview } from "../../api";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
const DeleteReview = ({
  person,
  setPerson,
  setStars,
  // setShowModal,
  btnNo2Style,
  btnNo2Text,
  review,
  // setModalType,
}) => {
  const { user } = useContext(UserContext);
  const { setModalType, setShowModal } = useContext(ModalContext);
  const handleReview = () => {
    if (user) {
      let data = {
        reviewedBy: user._id,
        reviewId: review._id,
        nannyId: review.nannyId,
      };
      const authtoken = JSON.parse(localStorage.getItem("nannyTkn"));
      deleteReview(authtoken, data)
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
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="flex items-center justify-between p-6 rounded ">
      <button
        className="bg-gray-500 rounded-lg text-white p-2 w-[6.5rem] mr-2 "
        type="button"
        onClick={() => {
          setModalType("");
          setShowModal(false);
        }}
      >
        Anuluj
      </button>
      <button
        className={`${btnNo2Style}  text-white p-2 w-[6.5rem] ml-2 rounded-lg`}
        type="button"
        onClick={() => handleReview()}
      >
        {btnNo2Text}
      </button>
    </div>
  );
};

export default DeleteReview;
