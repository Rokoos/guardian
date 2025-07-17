import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import { logout } from "../../utils";
import { toast } from "react-toastify";
import { deleteUser } from "../../api";

const DeleteProfile = ({ email, id }) => {
  console.log("id", id);
  let navigate = useNavigate();
  const { user, isAuth, isAdmin, setUser, setIsAuth, setIsAdmin } =
    useContext(UserContext);
  const { setShowModal, setModalType } = useContext(ModalContext);
  // console.log("id", id);
  const authtoken = JSON.parse(localStorage.getItem("nannyTkn"));
  const handleDelete = async () => {
    if (user && authtoken) {
      try {
        let data = {
          email,
          id,
        };
        const response = await deleteUser(authtoken, data);
        console.log("delete response", response);
        setShowModal(false);
        setModalType("");
        isAdmin ? navigate("/admin") : navigate("/nannys");

        if (!isAdmin) {
          logout();
          setUser(null);
          setIsAuth(false);
        }
        toast.success(isAdmin ? "User usunięty." : "Do zobaczenia!", {
          autoClose: 1500,
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  return (
    <div className=" w-full  flex flex-col items-center justify-center ">
      <h5 className="font-bold text-gray-700 font-montserrat">Czy na pewno?</h5>

      <div className="flex items-center justify-between p-6 rounded ">
        <button
          className="bg-gray-400 rounded-lg text-white p-2 w-[6.5rem] mr-4 "
          type="button"
          onClick={() => {
            setModalType("");
            setShowModal(false);
          }}
        >
          Anuluj
        </button>
        <button
          className=" rounded-lg text-white bg-red-500 p-2 w-[6.5rem] ml-4"
          type="button"
          // onClick={() => handleDelete(user._id)}
        >
          Usuń
        </button>
      </div>
    </div>
  );
};

export default DeleteProfile;
