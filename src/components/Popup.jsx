import React from "react";

const Popup = () => {
  return (
    <div>
      <h4>Cookies Compliance</h4>
      <p>
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
        corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
        quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur?"
      </p>

      <div className="flex flex-row justify-around items-center  w-full py-2">
        <button
          className="bg-gray-500 rounded-lg text-white p-2 w-[6.5rem] mr-2 "
          type="button"
        >
          Cancel
        </button>
        <button
          className=" text-white p-2 w-[6.5rem] ml-2 rounded-lg"
          type="button"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default Popup;
