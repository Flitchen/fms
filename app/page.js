import { getServerSession } from "next-auth";
import React from "react";
import { FaFolderClosed, FaPeopleGroup, FaFileLines } from "react-icons/fa6";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const { user } = await getServerSession(authOptions);
  return (
    <div className="ml-[80px]">
      <div className="mt-20 grid gap-8 hero">
        {user?.user.role === 1 ? (
          <Link href={`/users`} passHref>
            <div className="max-w-sm p-6 bg-slate-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 hover:shadow-xl">
              <div className="flex flex-col justify-start items-center pt-5 px-2 pb-2 rounded-lg">
                <FaPeopleGroup className="text-green-500 text-4xl" />
                <span className="text-center capitalize">Users</span>
              </div>
            </div>
          </Link>
        ) : (
          ""
        )}
        <Link href={`/categories`} passHref>
          <div className="max-w-sm p-6 bg-slate-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 hover:shadow-xl">
            <div className="flex flex-col justify-start items-center pt-5 px-2 pb-2 rounded-lg">
              <FaFolderClosed className="text-sky-500 text-4xl" />
              <span className="text-center capitalize">Categories</span>
            </div>
          </div>
        </Link>
        <Link href={`/files`} passHref>
          <div className="max-w-sm p-6 bg-slate-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 hover:shadow-xl">
            <div className="flex flex-col justify-start items-center pt-5 px-2 pb-2 rounded-lg">
              <FaFileLines className="text-purple-500 text-4xl" />
              <span className="text-center capitalize">Files</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
