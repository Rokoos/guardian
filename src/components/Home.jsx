import Button from "./Button";
import arrowRight from "../assets/icons/arrow-right.svg";
import nannyHero from "../assets/images/nannyHero.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className=" w-full  flex xl:flex-row flex-col xl:mt-60  justify-around  max-container max-w-[1920px]   ">
        <div className="   md:mt-12  flex flex-col justify-center items-center">
          <span className="text-coral-red mt-10 xl:mt-0 font-palanquin  text-3xl  min-[360px]:text-4xl md:text-6xl 2xl:text-8xl max-sm:leading-[82px] font-bold  ">
            Warsaw Nanny
          </span>
        </div>
        <div className="relative   mt-10 mb-20 min-[360px]:mt-20   flex justify-center items-center py-0  p-4 bg-cover">
          <img
            src={nannyHero}
            alt="BigShoe1"
            width={610}
            height={500}
            className="object-contain relative z-10 rounded-full"
          />
        </div>
      </div>

      <div className=" md:flex justify-center max-w-[1600px] max-container">
        <div className="flex flex-col w-full md:flex-row md:w-4/5  items-center mb-40 md:mb-10 ">
          <Link to="/signup" className="md:w-1/2  flex justify-center my-3">
            <Button label="Zarwjestruj się" iconUrl={arrowRight} />
          </Link>
          <span className="text-coral-red font-bold">lub</span>
          <Link to="/signin" className="md:w-1/2 flex justify-center my-3">
            <Button label="Zaloguj" iconUrl={arrowRight} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
