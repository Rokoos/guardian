import { useContext } from "react";
import { FiStar } from "react-icons/fi";
import { UserContext } from "../context/UserContext";
export default function StarRatings({ stars, setStars, filters, setFilters }) {
  // console.log("filters Stars", filters);
  // console.log("stars", stars);
  const checkSource = () => {
    if (filters) {
      return filters.stars;
      // console.log("stars in the air");
    } else {
      // console.log("tralalal");
      return stars;
    }
  };

  const filtersOrStarsArray = (index) => {
    if (filters) {
      setFilters({ ...filters, stars: index + 1 });
    } else {
      if (setStars) setStars(index + 1);
    }
  };
  return (
    <div className="flex bg-white items-center justify-between  ">
      <div className="flex gap-2 p-2 mb-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex justify-center">
            <FiStar
              size={25}
              strokeWidth={0}
              fill={index + 1 <= checkSource() ? "gold" : "#D6DBDF"}
              cursor="pointer"
              className="star hover:fill-yellow-500 duration-150"
              onClick={() => filtersOrStarsArray(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
