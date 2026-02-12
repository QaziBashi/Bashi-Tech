import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const Samsung = () => {
  return (
    <div className="w-full h-screen mt-20">
      <div className="w-full flex justify-between px-[30px]">
        <h2>Create a New Product</h2>
        <button className="flex items-center justify-center gap-1 w-[120px] h-[30px] bg-amber-400">
          <AiOutlinePlus />
          Add Product
        </button>
      </div>
    </div>
  );
};

export default Samsung;
