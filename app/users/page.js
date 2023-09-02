"use client";
import AddBtn from "@/components/AddBtn";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const { user } = session;
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
      {user.user.role == 1 ? (
        <>
          {roles.length !== 0 ? (
            <div>
              <div className="text-5xl text-center text-semibold">
                Users Page
              </div>
              <Link href={"/users/add-user"} passHref>
                <AddBtn type="user" />
              </Link>
            </div>
          ) : (
            <div>Loading...</div>
          )}
          <div className="mt-20 grid gap-5 hero">
            {roles.map((role) => (
              <Link href={`/users/${role.name}s`} key={role.id} passHref>
                <div className="flex flex-col justify-start items-center pt-5 px-2 pb-2 rounded-lg hover:bg-gray-300">
                  <FontAwesomeIcon icon={faUser} size="2x" />
                  <span className="text-center capitalize">{role.name}s</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <h1 className="text-center text-3xl">Unauthorized page</h1>
      )}
    </>
  );
}
