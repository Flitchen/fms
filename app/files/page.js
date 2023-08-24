"use client";
import AddBtn from "@/components/AddBtn";
import {
  faFile,
  faFolderClosed,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default async function Page() {
  const { data: session } = useSession();
  const { user } = session;
  // console.log(user);
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
            <Link href={"/files/add-file"} passHref>
              <AddBtn type="file" />
            </Link>
          </div>
        ) : (
          <div></div>
        )}
        <div className="mt-20 grid gap-5 hero">
          {files.map((file) => (
            <a href={`${file.content}`}>
              <div
                key={file.id}
                className="flex flex-col justify-start items-center pt-5 px-2 pb-2 rounded-lg hover:bg-gray-300"
              >
                <FontAwesomeIcon icon={faFile} size="2x" />
                <span className="text-center capitalize">{file.name}s</span>
              </div>
            </a>
          ))}
        </div>
      </>
    </>
  );
}
