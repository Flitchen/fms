import EditUser from "@/components/EditUser";
import React from "react";

export default async function Page({ params }) {
  return (
    <div>
      <EditUser id={params.id} />
    </div>
  );
}
