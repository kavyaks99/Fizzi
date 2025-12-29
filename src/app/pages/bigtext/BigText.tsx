import React from "react";

function BigText() {
  return (
    <div className="min-h-screen w-screen overflow-hidden bg-[#FE6334] text-[#FEE832]">
      <h2 className="grid w-full text-center uppercase leading-[0.7] gap-[3vw] py-10 font-black">
        <div className="text-[34vw]">Soda</div>
        <div className="grid gap-[3vw] text-[34vw] md:flex md:text-[11vw]">
          <span className="inline-block">That</span>
          <span className="max-md:text-[27vw] inline-block">Makes</span>
          <span className=" max-md:text-[27vw] inline-block">You</span>
        </div>
        <div className="text-[34vw]">Smile</div>
      </h2>
    </div>
  );
}

export default BigText;
