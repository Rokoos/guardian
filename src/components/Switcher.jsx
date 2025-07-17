const Switcher = ({ isChecked, handleCheckboxChange }) => {
  // console.log("isChecked", isChecked);
  return (
    <div className="flex flex-col w-[16rem] md:w-[20rem] justify-between items-center   rounded-2xl  mb-2">
      <h4 className="w-full text-sm font-bold  leading-6 text-coral-red my-3 ">
        Pilne zlecenie?
      </h4>
      <div className="w-full flex flex-col items-center ">
        {isChecked ? (
          <span className="text-gray-700">Tak</span>
        ) : (
          <span className="text-gray-700">Nie</span>
        )}
        <label className="relative inline-flex items-center cursor-pointer mt-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            value=""
            className="sr-only peer"
          />

          <div className="w-9 h-5 bg-gray-400 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-coral-red hover:peer-checked:bg-coral-red"></div>
        </label>
      </div>
    </div>
  );
};

export default Switcher;
