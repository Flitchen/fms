"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import React from "react";
import { toast } from "react-hot-toast";

export default function AddFile() {
  const { data: session } = useSession();
  const { user } = session;
  const router = useRouter();
  const [category, setCategory] = useState("");
  const uploader = user.user.id;
  const [file, setFile] = useState();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getCategories() {
      const response = await fetch(`http://localhost:3000/api/categories`, {
        cache: "no-store",
      });
      const categoryData = await response.json();
      setCategories(categoryData);
    }
    getCategories();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    toast.loading("Uploading file");

    try {
      const data = new FormData();
      data.set("file", file);
      data.set("category", category);
      data.set("user", uploader);
      const response = await fetch("http://localhost:3000/api/files", {
        method: "POST",
        body: data,
      });
      // Checking if the response was okay.
      if (response.ok) {
        toast.success("File was uploaded successfully");
        router.push("/files");
      } else {
        toast.error("Failed to upload file");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="max-w-md mx-auto p-4 pb-20 bg-white border rounded shadow"
      >
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-center my-4 cursor-pointer">
            Add new file
          </h1>
        </div>
        <div className="space-y-4">
          <input
            type="number"
            name="user"
            value={uploader}
            className="hidden"
            readOnly
          />
          <div>
            <label htmlFor="category" className="block text-sm  text-gray-700">
              Choose the category where the file belongs to:
            </label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Enter category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              list="category-list"
              className="block text-sm py-3 px-4 mt-3 mb-10 rounded-lg w-full border outline-none"
              required
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
            id="file"
            name="file"
            placeholder="Enter file"
            onChange={(e) => {
              setFile(e.target.files?.[0]);
            }}
            className="block text-sm py-3 px-4 my-10 rounded-lg w-full border outline-none"
            required
          />
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="py-3 w-64 text-xl text-white bg-gray-800 rounded-2xl"
          >
            Add File
          </button>
        </div>
      </form>
    </div>
  );
}
