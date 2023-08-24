"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import React from "react";

export default function AddFile() {
  const { data: session } = useSession();
  const { user } = session;
  const router = useRouter();
  const [fileData, setFileData] = useState({
    name: "",
    desc: "",
    category: "",
    project: "",
    content: "",
    uploader: user.user.role,
  });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getCategories() {
      const response = await fetch(`http://localhost:3000/api/categories`, {
        cache: "no-store",
      });
      const categoryData = await response.json();
      console.log(categoryData);
      setCategories(categoryData);
    }
    getCategories();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fileData),
    });
    // Checking if the response was okay.
    if (response.ok) {
      alert("File was uploaded successfully");
      router.push("/files");
    } else {
      alert("Failed to upload file");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 pb-20 bg-white border rounded shadow"
      >
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-center my-4 cursor-pointer">
            Add new file
          </h1>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter the file name"
            value={fileData.name}
            onChange={(e) => {
              setFileData({ ...fileData, name: e.target.value });
            }}
            className="block text-sm py-3 px-4 my-10 rounded-lg w-full border outline-none"
            required
          />
          <input
            type="text"
            id="desc"
            name="desc"
            placeholder="Short description of the file"
            value={fileData.desc}
            onChange={(e) => {
              setFileData({ ...fileData, desc: e.target.value });
            }}
            className="block text-sm py-3 px-4 my-10 rounded-lg w-full border outline-none"
          />
          <div>
            <label htmlFor="category" className="block text-sm  text-gray-700">
              Choose the category where the file belongs to:
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={fileData.category}
              onChange={(e) => {
                setFileData({ ...fileData, category: e.target.value });
              }}
              list="category-list"
              className="block text-sm py-3 px-4 mt-3 mb-10 rounded-lg w-full border outline-none"
            />
            <datalist id="category-list">
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.name}
                  className="capitalize"
                />
              ))}
            </datalist>
          </div>

          <input
            type="file"
            id="content"
            name="content"
            placeholder="Enter your file"
            value={fileData.content}
            onChange={(e) => {
              setFileData({ ...fileData, content: e.target.value });
            }}
            className="block text-sm py-3 px-4 my-10 rounded-lg w-full border outline-none"
            required
          />
        </div>
        <div className="text-center mt-6">
          <button className="py-3 w-64 text-xl text-white bg-gray-800 rounded-2xl">
            Add File
          </button>
        </div>
      </form>
    </div>
  );
}
