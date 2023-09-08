"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const AddCategory = () => {
  const router = useRouter();
  const [name, setName] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Creating category");

    const response = await fetch("http://localhost:3000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    // Checking if the response was okay.
    if (response.ok) {
      toast.success("Category was added successfully");
      router.push("/categories");
    } else {
      toast.error("Failed to add category");
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
            Add new category
          </h1>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter category name"
            value={name}
            autoComplete="off"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="block text-sm py-3 px-4 my-10 rounded-lg w-full border outline-none"
            required
          />
        </div>
        <div className="text-center mt-6">
          <button className="py-3 w-64 text-xl text-white bg-gray-800 rounded-2xl">
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
