import { useState, useEffect } from "react";
const lngsOptions = [
  "English",
  "German",
  "Dutch",
  "Ukrainian",
  "Russian",
  "Spanish",
];
const levelOptions = ["A1", "A2", "B1", "B2", "C1", "C2"];

const Language = ({
  l,
  lngs,
  setLngs,
  language,
  setLanguage,
  level,
  setLevel,
}) => {
  // console.log("lng", newLng);
  // console.log("l", l);
  // console.log("lngs", lngs);
  const handleLanguage = (e) => setLanguage(e.target.value);
  const handleLevel = (e) => setLevel(e.target.value);

  const filterLanguages = (arr1, arr2) => {
    return arr1.filter((i) => !arr2.filter((y) => y.lng === i).length);
  };

  return (
    <fieldset>
      <div className="flex">
        <div className="mt-2 w-3/5 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <select
            value={language}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-coral-red sm:text-sm sm:leading-6"
            onChange={handleLanguage}
          >
            <option>Language</option>
            {filterLanguages(lngsOptions, lngs).map((l, index) => (
              <option key={index} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div className=" mt-2 w-2/5 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <select
            value={level}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-coral-red sm:text-sm sm:leading-6"
            onChange={handleLevel}
          >
            <option>Level</option>
            {levelOptions.map((o, index) => (
              <option key={index} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>
    </fieldset>
  );
};

export default Language;
