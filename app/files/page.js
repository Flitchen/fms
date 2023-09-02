"use client";
import AddBtn from "@/components/AddBtn";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    async function getFiles() {
      const response = await fetch("http://localhost:3000/api/files", {
        cache: "no-store",
      });
      const fileData = await response.json();

      setFiles(fileData);
    }
    getFiles();
  }, []);
  return (
    <>
      <>
        {files.length !== 0 ? (
          <div>
            <div className="text-5xl text-center text-semibold">Files Page</div>
            <div className="flex justify-between">
              <h2 className="text-xl capitalize font-semibold">
                List of all files
              </h2>
              <Link href={"/files/add-file"} passHref>
                <AddBtn type="file" />
              </Link>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <div className="mt-20 grid gap-5 hero">
          {files.map((file) => (
            <a href={`${file.name}`} key={file.id} target="_blank">
              <div className="flex flex-col justify-start items-center pt-5 px-2 pb-2 rounded-lg hover:bg-gray-300">
                <FontAwesomeIcon icon={faFileLines} size="2x" />
                <span className="text-center capitalize">{file.name}</span>
              </div>
            </a>
          ))}
        </div>
      </>
    </>
  );
}
