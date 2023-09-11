"use client";
import Link from "next/link";
import {
  FaChartBar,
  FaLayerGroup,
  FaPeopleGroup,
  FaRectangleList,
} from "react-icons/fa6";
import { PiFiles } from "react-icons/pi";
import { BiSolidLock } from "react-icons/bi";

import { useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();
  const { user } = session;

  return (
    <div className="bg-sky-900 h-screen text-white w-56 flex-shrink-0  hidden md:block shadow-4xl sticky top-0">
      <nav className="text-md">
        <div className="text-2xl  pb-3 pt-2 h-16 bg-sky-800">
          <Link href="/" passHref>
            <div className="flex flex-row mt-3 ml-3">
              <PiFiles className="text-orange-400 mr-4 text-[38px]" />
              <span className="text-orange-400 font-medium text-[40px] ml-1">
                4
              </span>
              <span className="text-white text-2xl font-medium mt-2">SITE</span>
            </div>
          </Link>
        </div>
        <ul className="p-3 pt-12 text-md text-white">
          <Link href={"/"} passHref>
            <li className="py-4 hover:bg-orange-400 hover:rounded-lg">
              <div className="flex flex-row px-2 items-center">
                <FaChartBar className="text-white mr-1 text-xl" />
                <span className="ml-3 hover:text-gray-300 block">
                  Dashboard
                </span>
              </div>
            </li>
          </Link>

          {user.user.role == 1 ? (
            <Link href={"/users"} passHref>
              <li className="py-4 hover:bg-orange-400 hover:rounded-lg">
                <div className="flex flex-row px-2 items-center">
                  <FaPeopleGroup className="text-white mr-1 text-xl" />
                  <span className="ml-3 hover:text-gray-300 block">Users</span>
                </div>
              </li>
            </Link>
          ) : (
            <div></div>
          )}

          <Link href={"/categories"} passHref>
            <li className="py-4 hover:bg-orange-400 hover:rounded-lg">
              <div className="flex flex-row px-2 items-center">
                <FaRectangleList className="text-white mr-1 text-xl" />
                <span className="ml-3 hover:text-gray-300 block">
                  Categories
                </span>
              </div>
            </li>
          </Link>
          <Link href={"/files"} passHref>
            <li className="py-4 text-white hover:text-gray-300 hover:bg-orange-400 hover:rounded-lg">
              <div className="flex flex-row px-2 items-center-2">
                <FaLayerGroup className="text-white mr-1 text-xl" />
                <span className="ml-3 block">Files</span>
              </div>
            </li>
          </Link>
          <Link href={"/password-change"} passHref>
            <li className="py-4 text-white hover:text-gray-300 hover:bg-orange-400 hover:rounded-lg">
              <div className="flex flex-row px-2 items-center-2">
                <BiSolidLock className="text-white mr-1 text-xl" />

                <span className="ml-3 block">Change Password</span>
              </div>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
