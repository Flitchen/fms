"use client";
import AddBtn from "@/components/AddBtn";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
// import Loading from "../loading";

export default function Page() {
  const { data: session } = useSession();
  const { user } = session;
  return (
    <>
      {user.user.role === 1 ? (
        <>
          <div className="text-5xl text-center text-semibold">Users Page</div>
          <Link href={"/users/add-user"} passHref>
            <AddBtn type="user" />
          </Link>
          <RoleList />
        </>
      ) : (
        <h1 className="text-center text-5xl mt-14">Unauthorized page</h1>
      )}
    </>
  );
}
function RoleList() {
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    async function getUsers() {
      const response = await fetch("http://localhost:3000/api/users", {
        cache: "no-store",
      });
      const userRoles = await response.json();

      setRoles(userRoles);
    }
    getUsers();
  }, []);

  return (
    <>
      {roles.length !== 0 ? (
        <div className="mt-20 grid gap-5 hero">
          {roles.map((role) => (
            <Link href={`/users/${role.name}s`} key={role.id} passHref>
              <div className="max-w-sm p-6 bg-slate-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 hover:shadow-xl">
                <div className="flex flex-col justify-start items-center pt-5 px-2 pb-2 rounded-lg ">
                  <FaPeopleGroup className="text-sky-500 text-4xl" />
                  <span className="text-center capitalize">{role.name}s</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // <Loading />
        ""
      )}
    </>
  );
}
