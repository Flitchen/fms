"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {}, [error]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-4xl text-center m-10">Something went wrong!</h2>
      <button
        className="bg-sky-700 rounded-full"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
