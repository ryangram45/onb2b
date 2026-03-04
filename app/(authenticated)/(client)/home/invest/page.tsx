"use-client";

import { IoSearch } from "react-icons/io5";

const Invest = () => {
  return (
    <div className="pt-42 pb-15 flex flex-col gap-3">
      <div className="w-full bg-gray-200 flex items-center p-1.5 rounded container mx-auto border-none gap-2 text-black max-w-104 sm:max-w-[32.9rem] z-30">
        <IoSearch className="mt-1" color="gray" />
        <input
          type="text"
          placeholder="Hi, I'm Erica. How can I help?"
          className="w-full outline-none placeholder:text-gray-500"
        />
      </div>
      <div className="w-full h-200 bg-gray-100 max-w-3xl justify-self-center container mx-auto"></div>
    </div>
  );
};

export default Invest;
