import React from "react";

export default function AddBtn({ type }) {
  return (
    <>
      <button className="float-right p-3 px-5 text-white m-4 rounded-full bg-gray-800 hover:bg-orange-400">
        Add {type}
      </button>
    </>
  );
}
