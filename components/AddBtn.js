import React from "react";

export default function AddBtn({ type }) {
  return (
    <>
      <button className="float-right p-3 px-5 text-white m-4 rounded-full bg-sky-900 hover:bg-sky-700">
        Add {type}
      </button>
    </>
  );
}
