"use client";
import AddUser from "@/components/AddUser";
import { useSession } from "next-auth/react";
import React from "react";

export default function page() {
  const { data: session } = useSession();
  const { user } = session;
  return (
    <>
      {user.user.role == 1 ? (
        <AddUser />
      ) : (
        <h1 className="text-center text-5xl mt-14">Unauthorized page</h1>
      )}
    </>
  );
}
