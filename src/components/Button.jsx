const Button = ({ label, iconUrl, btnStyle, disabled }) => {
  return (
    <button
      className={`flex justify-center items-center gap-2 px-7 py-4 border-2 font-montserrat   leading-none bg-coral-red rounded-full text-white border-coral-red min-w-[15rem] hover:text-coral-red hover:bg-transparent hover:border-2 hover:border-coral-red transition duration-300 ease-in-out hover:font-bold ${btnStyle}`}
      disabled={disabled}
    >
      {label}
      {iconUrl && (
        <img
          src={iconUrl}
          alt="ArrowRight"
          className="ml-2 rounded-full flex justify-self-end w-5 h-5  "
        />
      )}
    </button>
  );
};

export default Button;
