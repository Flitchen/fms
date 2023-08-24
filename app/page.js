import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const { user } = await getServerSession(authOptions);

  return (
    <div className="m-5">
      <div className="text-5xl text-center text-semibold">
        Welcome to the Home Page,
        <span className="capitalize"> {user?.user.first_name}</span>
      </div>
    </div>
  );
}
