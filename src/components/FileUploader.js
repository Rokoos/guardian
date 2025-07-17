import { Fragment, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

import Resizer from "react-image-file-resizer";

const FileUploader = ({ setImageUrl, imageUrl }) => {
  const { user } = useContext(UserContext);

  const authtoken = JSON.parse(localStorage.getItem("nannyTkn"));
  const [newImg, setNewImg] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      toast.warning("Use smaller image");
    } else {
      fileChangedHandler(file);
    }
  };

  const fileChangedHandler = (file) => {
    Resizer.imageFileResizer(
      file,
      250,
      250,
      "JPEG",
      100,
      0,
      async (uri) => {
        setNewImg(uri);

        if (uri) {
          try {
            const result = await axios.post(
              `${process.env.REACT_APP_API}/uploadData`,
              {
                type: "image",
                data: uri,
                userId: user._id,
              },
              {
                headers: {
                  authtoken,
                },
              }
            );
            setImageUrl(result.data.url);
          } catch (error) {
            toast.error(error.response.data.message);
          }
        }
      },
      "base64"
    );
  };

  return (
    <Fragment>
      {imageUrl || newImg ? (
        <img
          src={!newImg ? imageUrl : newImg}
          className="w-[250px]  rounded-lg mb-3"
          alt=""
        />
      ) : (
        <div className="border-2 rounded-lg mb-4  border-coral-red bg-white text-coral-red">
          <FaRegUser className="w-[100px] h-[100px] p-5  " />
        </div>
      )}

      <label className=" block font-bold  leading-6 text-white bg-coral-red px-3 py-2 rounded-lg cursor-pointer">
        Dodaj/Zmień Zdjęcie
        <input
          hidden
          type="file"
          accept="image/*,.pdf"
          // onChange={handleImage}
          className="border-2 border-coral-red"
        />
      </label>
    </Fragment>
  );
};

export default FileUploader;
