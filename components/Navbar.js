"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  FaChartBar,
  FaLayerGroup,
  FaPeopleGroup,
  FaRectangleList,
} from "react-icons/fa6";
import { BiSolidLock, BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";

import React from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const { user } = session;
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-sky-900 w-full sticky top-0">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex text-orange-400 items-center">
              Welcome,
              <span className="uppercase ml-1 text-white">
                {user.user.first_name} {user.user.last_name}
              </span>
            </div>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to log out?")) {
                  signOut();
                }
              }}
              className="text-black rounded-xl px-5 py-2 hidden md:block  bg-orange-400 hover:bg-orange-600"
            >
              Logout
            </button>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleNavbar}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger menu icon */}
                <svg
                  className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Close icon */}
                <svg
                  className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
          <ul className="p-2">
            <li className="py-4 text-white hover:text-gray-300 hover:bg-orange-400 hover:rounded">
              <Link
                href="/"
                passHref
                className="flex flex-row px-3 items-center"
              >
                <FaChartBar />
                <span className="ml-5 block">Dashboard</span>
              </Link>
            </li>
            {user?.user.role === 1 ? (
              <li className="py-4 text-white hover:text-gray-300 hover:bg-orange-400 hover:rounded">
                <Link
                  href="/users"
                  passHref
                  className="flex flex-row px-3 items-center"
                >
                  <FaPeopleGroup />
                  <span className="ml-5 block">Users</span>
                </Link>
              </li>
            ) : (
              <div></div>
            )}

            <li className="py-4 text-white hover:text-gray-300 hover:bg-orange-400 hover:rounded">
              <Link
                href="/categories"
                passHref
                className="flex flex-row px-3 items-center"
              >
                <FaRectangleList />
                <span className="ml-5 block">Categories</span>
              </Link>
            </li>
            <li className="py-4 text-white hover:text-gray-300 hover:bg-orange-400 hover:rounded">
              <Link
                href="/files"
                passHref
                className="flex flex-row px-3 items-center"
              >
                <FaLayerGroup />
                <span className="ml-5 block">Files</span>
              </Link>
            </li>
            <li className="py-4 text-white hover:text-gray-300 hover:bg-orange-400 hover:rounded">
              <Link
                href="/password-change"
                passHref
                className="flex flex-row px-3 items-center"
              >
                <BiSolidLock />
                <span className="ml-5 block">Change Password</span>
              </Link>
            </li>

            <li
              onClick={() => {
                if (confirm("Are you sure you want to log out?")) {
                  signOut();
                }
              }}
              className="py-4 text-white hover:text-gray-300 hover:bg-orange-400 hover:rounded"
            >
              <div className="flex flex-row px-3 items-center">
                <BiLogOut />
                <span className="ml-5 block">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
