'use client'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faRectangleList,
} from "@fortawesome/free-regular-svg-icons";
import { faLayerGroup, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default function Sidebar() {
  const { data: session } = useSession();
  const { user } = session;

  return (
    <div className="bg-gray-800 h-screen text-white w-64 flex-shrink-0  hidden md:block">
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
                <FontAwesomeIcon icon={faChartBar} className="mr=2" />
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
                  <FontAwesomeIcon icon={faPeopleGroup} className="mr=2" />
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
                <FontAwesomeIcon icon={faRectangleList} className="mr=2" />
                <span className="ml-5 hover:text-gray-300 block">
                  Categories
                </span>
              </div>
            </li>
          </Link>
          <Link href={"/files"} passHref>
            <li className="py-4 text-white hover:text-gray-300 hover:bg-orange-400 hover:rounded">
              <div className="flex flex-row px-3">
                <FontAwesomeIcon
                  icon={faLayerGroup}
                  className="text-white mr=2"
                />
                <span className="ml-5 block">Files</span>
              </div>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
