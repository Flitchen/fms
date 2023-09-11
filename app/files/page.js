"use client";
import AddBtn from "@/components/AddBtn";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFileLines, FaTrashCan } from "react-icons/fa6";
import Loading from "../loading";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function Page() {
  return (
    <>
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

      <FileList />
    </>
  );
}

function FileList() {
  const [files, setFiles] = useState([]);
  const { data: session } = useSession();
  const { user } = session;
  useEffect(() => {
    async function getFiles() {
      const response = await fetch("http://localhost:3000/api/files", {
        cache: "no-store",
      });
      const fileData = await response.json();

      setFiles(fileData);
    }
    getFiles();
  }, [files]);
  return (
    <>
      {files.length !== 0 ? (
        <div className="w-full">
          <ul className="divide-y divide-gray-300">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex  items-center justify-between py-2"
              >
                <a
                  href={`${file.name}`}
                  key={file.id}
                  target="_blank"
                  className="hover:bg-gray-300 w-full p-2 hover:rounded"
                >
                  <div className="flex justify-start items-center  gap-5">
                    <FaFileLines />

                    <span className="capitalize">{file.name}</span>
                  </div>
                </a>
                {user.user.role === 1 ? (
                  <div
                    className="flex justify-around space-x-2 hover:bg-gray-300 p-2 rounded"
                    onClick={async () => {
                      const hasConfirmed = confirm(
                        `Are you sure you want to delete ${file.name}?`
                      );

                      if (hasConfirmed) {
                        try {
                          const response = await fetch(
                            `http://localhost:3000/api/files/${file.name}`,
                            { method: "DELETE" }
                          );
                          if (!response.ok) {
                            toast.error("Failed to delete file");
                          } else {
                            toast.success("File was deleted successfully");
                          }
                        } catch (error) {
                          console.log(error);
                        }
                      }
                    }}
                  >
                    <FaTrashCan />
                  </div>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
