"use client";
import Link from "next/link";
import {
  FaChartBar,
  FaLayerGroup,
  FaPeopleGroup,
  FaRectangleList,
} from "react-icons/fa6";

import { useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();
  const { user } = session;

  return (
    <div className="bg-gray-800 h-screen text-white w-56 flex-shrink-0  hidden md:block">
      <nav className="text-sm">
        <div className="text-3xl ml-6 pb-14">
          <Link href="/" passHref>
            <span className="text-white font-bold text-xl">4 SITE</span>
          </Link>
        </div>
        <ul className="p-2">
          <Link href={"/"} passHref>
            <li className="py-4 hover:bg-orange-400 hover:rounded">
              <div className="flex flex-row px-3">
                <FaChartBar className="text-white mr=2" />
                <span className="ml-5 hover:text-gray-300 block">
                  Dashboard
                </span>
              </div>
            </li>
          </Link>

          {user.user.role == 1 ? (
            <Link href={"/users"} passHref>
              <li className="py-4 hover:bg-orange-400 hover:rounded">
                <div className="flex flex-row px-3">
                  <FaPeopleGroup className="text-white mr=2" />
                  <span className="ml-5 hover:text-gray-300 block">Users</span>
                </div>
              </li>
            </Link>
          ) : (
            <div></div>
          )}

          <Link href={"/categories"} passHref>
            <li className="py-4 hover:bg-orange-400 hover:rounded">
              <div className="flex flex-row px-3">
                <FaRectangleList className="text-white mr=2" />
                <span className="ml-5 hover:text-gray-300 block">
                  Categories
                </span>
              </div>
            </li>
          </Link>
          <Link href={"/files"} passHref>
            <li className="py-4 text-white hover:text-gray-300 hover:bg-orange-400 hover:rounded">
              <div className="flex flex-row px-3">
                <FaLayerGroup className="text-white mr=2" />
                <span className="ml-5 block">Files</span>
              </div>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
