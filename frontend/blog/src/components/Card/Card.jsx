import React from "react";

function Card({ title, imgSource }) {
  return (
    <div className="rounded-2xl h-[300px] w-[250px] py-9 px-2 bg-slate-300">
      <div className="flex justify-center">
        <img
          src={imgSource}
          alt="Cover Image"
          className="h-48 w-38 rounded-lg"
        />
      </div>

      <div className="flex justify-center mt-5">
        <h1 className="font-bold text-xl">{title}</h1>
      </div>
    </div>
  );
}

export default Card;
