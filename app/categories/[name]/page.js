"use client";
import AddBtn from "@/components/AddBtn";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFileLines, FaTrashCan } from "react-icons/fa6";
// import Loading from "@/app/loading";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function Page({ params }) {
  return (
    <>
      <div>
        <div className="text-5xl text-center text-semibold">
          Files in the category of{" "}
          <span className="capitalize">{params.name.replace("%20", " ")}</span>
        </div>
        <div className="flex justify-end m-2">
          <Link href={"/files/add-file"} passHref>
            <AddBtn type="file" />
          </Link>
        </div>
      </div>

      <FileListWithCategory name={params.name} />
    </>
  );
}

function FileListWithCategory({ name }) {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deletedFile, setDeletedFile] = useState("");

  const { data: session } = useSession();
  const { user } = session;
  useEffect(() => {
    async function getFiles() {
      const response = await fetch(
        `http://localhost:3000/api/categories/${name}`,
        {
          cache: "no-store",
        }
      );
      const fileData = await response.json();

      setFiles(fileData);
    }
    getFiles();
  }, [files]);
  return (
    <>
      <div className="flex justify-center relative mx-auto text-gray-600">
        <input
          type="search"
          name="search"
          placeholder="Search File"
          className="w-96 pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      {files.length !== 0 ? (
        <div className="w-full">
          <ul className="divide-y divide-gray-300">
            {files
              .filter((file) => file.name.toLowerCase().includes(search))
              .slice(0, 20)
              .map((file) => (
                <li
                  key={file.id}
                  className="flex  items-center justify-between py-2"
                >
                  <a
                    href={`/${file.name}`}
                    key={file.id}
                    target="_blank"
                    className="hover:bg-gray-300 w-full p-2 hover:rounded"
                  >
                    <div className="flex justify-start items-center  gap-5">
                      <FaFileLines className="text-sky-500 " />

                      <span className="capitalize">{file.name}</span>
                    </div>
                  </a>

                  {user.user.role === 1 ? (
                    <div
                      className="flex justify-around space-x-2 hover:bg-gray-300 p-2 rounded"
                      onClick={(e) => {
                        setDeleting((prev) => !prev);
                        setDeletedFile(file.name);
                      }}
                    >
                      <FaTrashCan className="text-red-400 " />
                    </div>
                  ) : (
                    ""
                  )}
                  {deleting && deletedFile === file.name ? (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
                      <div className="relative bg-white w-64 p-4 rounded-lg shadow-md">
                        <div className="font-semibold text-lg mb-2">
                          Delete Confirmation
                        </div>
                        <div className="text-gray-600 mb-4">
                          Are you sure you want to delete this file?
                        </div>
                        <div className="flex justify-end">
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                            onClick={async () => {
                              toast.loading(`Deleting file ${file.name}`);
                              try {
                                const response = await fetch(
                                  `http://localhost:3000/api/files/${file.name}`,
                                  { method: "DELETE" }
                                );
                                if (!response.ok) {
                                  toast.error("Failed to delete file");
                                } else {
                                  toast.success(
                                    "File was deleted successfully"
                                  );
                                }
                              } catch (error) {
                                console.log(error);
                              } finally {
                                setDeleting((prev) => !prev);
                                setDeletedFile("");
                              }
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            onClick={(e) => {
                              setDeleting((prev) => !prev);
                              setDeletedFile("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        // <Loading />
        // <h1 className="text-4xl text-center m-10">No files found</h1>
        ""
      )}
    </>
  );
}
