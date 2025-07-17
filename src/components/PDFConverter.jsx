import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

import axios from "axios";

const PDFJS = window.pdfjsLib;

const CVConverter = ({ title, content, handlePress, style }) => {
  // console.log("setRefLetter", setRefLetterUrl);
  const { user } = useContext(UserContext);

  const authtoken = JSON.parse(localStorage.getItem("nannyTkn"));

  // console.log("title", title);
  const [pdf, setPdf] = useState("");
  const [width, setWidth] = useState(0);
  const [images, setImages] = useState([]);

  const [pdfImg, setPdfImg] = useState(null);
  // console.log("pdfImg", pdfImg);
  // console.log("images", images[0]);
  const [height, setHeight] = useState(0);
  // const [totalPages, setTotalPages] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);
  const [pdfRendering, setPdfRendering] = useState("");
  const [pageRendering, setPageRendering] = useState("");

  // console.log("cvOrRefLetter", cvOrRefLetter);

  async function showPdf(event) {
    try {
      setPdfRendering(true);
      const file = event.target.files[0];
      // console.log("file", file);
      if (file.size > 1048576) {
        toast.warning("You must provide file smaller than 1MB!");
        setPdfRendering(false);
      } else {
        const uri = URL.createObjectURL(file);
        var _PDF_DOC = await PDFJS.getDocument({ url: uri });
        if (_PDF_DOC.numPages > 1) {
          toast.warning("You must provide 1 page pdf file!");
          setPdfRendering(false);
        } else {
          setPdf(_PDF_DOC);
          setPdfRendering(false);
          document.getElementById(title + "-to-upload").value = "";
        }
      }
    } catch (error) {
      alert(error.message);
    }
  }

  // function changePage() {
  //   setCurrentPage();
  // }

  async function renderPage() {
    setPageRendering(true);

    const canvas = document.createElement("canvas");
    canvas.setAttribute("className", "canv");
    let canv = document.querySelector(".canv");

    // for (let i = 1; i <= pdf.numPages; i++) {
    //   var page = await pdf.getPage(i);
    //   var viewport = page.getViewport({ scale: 1 });
    //   canvas.height = viewport.height;
    //   canvas.width = viewport.width;
    //   var render_context = {
    //     canvasContext: canvas.getContext("2d"),
    //     viewport: viewport,
    //   };
    //   setWidth(viewport.width);
    //   setHeight(viewport.height);
    //   await page.render(render_context).promise;
    //   let img = canvas.toDataURL("image/png");
    //   imagesList.push(img);
    // }

    var page = await pdf.getPage(1);
    var viewport = page.getViewport({ scale: 1 });
    canvas.height = viewport.height;
    // canvas.height = 200;
    canvas.width = viewport.width;
    // canvas.width = 100;
    var render_context = {
      canvasContext: canvas.getContext("2d"),
      viewport: viewport,
    };
    setWidth(viewport.width);
    setHeight(viewport.height);
    await page.render(render_context).promise;
    let img = canvas.toDataURL("image/png");
    setPdfImg(img);
    // setCVUrl(img);
    // console.log("img", img);
    handlePress(title, img);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API}/uploadData`,
        {
          type: title,
          data: img,
          userId: user._id,
        },

        {
          headers: {
            authtoken,
          },
        }
      );
      handlePress(title, result.data.url);
    } catch (error) {
      console.log("error", error);
    }

    // setImages(imagesList);
    setPageRendering(false);
  }

  useEffect(() => {
    pdf && renderPage();
    // eslint-disable-next-line
  }, [pdf]);

  // const sendData = async (jajco) => {
  //   if (pdfImg) {
  //     // console.log(fileSizeInBytes(pdfImg));

  //     const result = await axios.post(
  //       `${process.env.REACT_APP_API}/uploadData`,
  //       {
  //         type: jajco,
  //         data: pdfImg,
  //         userId: user._id,
  //       },
  //       { maxContentLength: Infinity, maxBodyLength: Infinity },

  //       {
  //         headers: {
  //           authtoken,
  //         },
  //       }
  //     );
  //     try {
  //       console.log("data", result.data);
  //       if (jajco === "cv") {
  //         setCVUrl(result.data.url);
  //       } else if (jajco === "refLetter") {
  //         setRefLetterUrl(result.data.url);
  //       }
  //       // setPdf(null);
  //       // setCvOrRefLetter("");
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   }
  // };

  return (
    <div className="mt-2  ">
      <div className="flex flex-col items-center">
        <button
          className={`" ${
            pdf ? "mb-3" : ""
          } block font-bold   py-2 leading-6 text-white bg-coral-red px-3 rounded-lg cursor-pointer "`}
          id="upload-button"
          onClick={() => {
            document.getElementById(title + "-to-upload").click();
          }}
        >
          {pdfRendering ? (
            <span>Loading CV...</span>
          ) : (
            <span className="text-sm">Dodaj / Zmień plik PDF</span>
          )}
        </button>
        <input
          type="file"
          id={`${title}-to-upload`}
          accept="application/pdf"
          hidden
          onChange={showPdf}
        />
        {(content || pdfImg) && (
          <div className="border-2 mt-3 border-coral-red mx-4 ">
            <img
              id="image-generated"
              src={content || pdfImg}
              alt="pdfImage"
              style={{
                width: "100%",
                height: "100%",
                margin: "0",
                border: "none",
              }}
            />
          </div>
        )}
      </div>
      {/* <button
        onClick={() => {
          // setCvOrRefLetter("cv");
          // sendData(title);
        }}
      >
        Submit {title}
      </button> */}
    </div>
  );
};

export default CVConverter;
