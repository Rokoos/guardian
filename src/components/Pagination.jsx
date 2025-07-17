import React from "react";
import { Link } from "react-router-dom";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { GrCaretPrevious } from "react-icons/gr";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";

const Pagination = ({ page, setPage, results }) => {
  console.log("pagination", page, results);
  return (
    <div className="flex flex-col items-center justify-between border-t  border-gray-200 bg-white px-4 py-3 sm:px-6 mb-40 md:mb-20">
      <div className="flex flex-col items-center">
        <h5 className="mb-4 text-gray-500 font-bold ">
          Page {page} of {results.numberOfPages}
        </h5>
        <div className="flex flex-1 justify-between items-center  ">
          {results.numberOfPages >= 3 &&
            results?.previous &&
            results.previous.page > 1 && (
              <div
                className="hidden md:flex   text-coral-red cursor-pointer justify-center items-center w-10 h-10 border-2 border-coral-red rounded-lg mr-2"
                onClick={() => setPage(1)}
              >
                {1}
              </div>
            )}
          {results?.previous && (
            <IoCaretBack
              className=" border-2 cursor-pointer border-coral-red w-10 h-10 text-coral-red mr-2 p-2 rounded-lg hover:bg-coral-red hover:text-white transition-transform  duration-200"
              onClick={() => setPage(results.previous.page)}
            />
          )}

          {results?.previous && (
            <div
              className="  text-coral-red cursor-pointer md:flex justify-center items-center md:w-10 md:h-10 md:border-2 md:border-coral-red md:rounded-lg"
              onClick={() => setPage(results.previous.page)}
            >
              {results.previous.page}
            </div>
          )}
          <div className="ml-2 mr-2 text-gray-600">{page}</div>
          {results?.next && (
            <div
              className="  text-coral-red cursor-pointer md:flex justify-center items-center md:w-10 md:h-10 md:border-2 md:border-coral-red md:rounded-lg"
              onClick={() => setPage(results.next.page)}
            >
              {results.next.page}
            </div>
          )}

          {results?.next && (
            <IoCaretForward
              className=" border-2 cursor-pointer border-coral-red w-10 h-10 text-coral-red ml-2 p-2 rounded-lg  hover:bg-coral-red hover:text-white transition-transform  duration-200"
              onClick={() => setPage(results.next.page)}
            />
          )}
          {results?.numberOfPages >= 3 &&
            results?.next &&
            results.next.page < results.numberOfPages && (
              <div
                className="hidden md:flex   text-coral-red cursor-pointer justify-center items-center w-10 h-10 border-2 border-coral-red rounded-lg mr-2"
                onClick={() => setPage(results.numberOfPages)}
              >
                {results.numberOfPages}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;

// {<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//         {/* <div>
//           <p className="text-sm text-gray-700">
//             Showing
//             <span className="font-medium">1</span>
//             to
//             <span className="font-medium">10</span>
//             of
//             <span className="font-medium">97</span>
//             results
//           </p>
//         </div> */}
//         <div className="bg-violet-400">
//           <nav
//             className="isolate inline-flex -space-x-px rounded-md shadow-xs"
//             aria-label="Pagination"
//           >
//             <Link
//               to="#"
//               className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               <span className="sr-only">Previous</span>
//               <svg
//                 className="size-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//                 data-slot="icon"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </Link>
//             {/* <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" --> */}
//             <Link
//               to="#"
//               aria-current="page"
//               className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               1
//             </Link>
//             <Link
//               to="#"
//               className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               2
//             </Link>
//             <Link
//               to="#"
//               className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
//             >
//               3
//             </Link>
//             <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0">
//               ...
//             </span>
//             <Link
//               to="#"
//               className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
//             >
//               8
//             </Link>
//             <Link
//               to="#"
//               className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               9
//             </Link>
//             <Link
//               to="#"
//               className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               10
//             </Link>
//             <Link
//               to="#"
//               className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//             >
//               <span className="sr-only">Next</span>
//               <svg
//                 className="size-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//                 data-slot="icon"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </Link>
//           </nav>
//         </div>
//       </div>}
