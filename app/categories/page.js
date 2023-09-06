"use client";
import AddBtn from "@/components/AddBtn";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFolderClosed } from "react-icons/fa6";

export default function Page() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getCategories() {
      const userResponse = await fetch("http://localhost:3000/api/categories", {
        cache: "no-store",
      });
      const userData = await userResponse.json();

      setCategories(userData);
    }
    getCategories();
  }, []);
  return (
    <>
      {categories.length !== 0 ? (
        <div>
          <div className="text-5xl text-center text-semibold">
            Categories Page
          </div>
          <Link href={"/categories/add-category"} passHref>
            <AddBtn type="category" />
          </Link>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <div className="mt-20 grid gap-5 hero">
        {categories.map((category) => (
          <Link
            href={`/categories/${category.name}`}
            key={category.id}
            passHref
          >
            <div className="flex flex-col justify-start items-center pt-5 px-2 pb-2 rounded-lg hover:bg-gray-300">
              <FaFolderClosed />
              <span className="text-center capitalize">{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
