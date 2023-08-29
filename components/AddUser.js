"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import React from "react";

export default function AddUser() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    phone: "",
    address: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // Checking if the response was okay.
    if (response.ok) {
      alert("User wass added successfully");
      router.push("/users");
    } else {
      alert("Failed to add user");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-xl text-center font-semibold mb-4">Add user</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 border rounded shadow"
      >
        <div className="grid grid-cols-2 gap-5">
          <div className="mb-4">
            <label
              htmlFor="fname"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="Required"
              value={formData.fname}
              onChange={(e) => {
                setFormData({ ...formData, fname: e.target.value });
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="mname"
              className="block text-sm font-medium text-gray-700"
            >
              Middle Name
            </label>
            <input
              type="text"
              id="mname"
              name="mname"
              placeholder="Optional"
              value={formData.mname}
              onChange={(e) => {
                setFormData({ ...formData, mname: e.target.value });
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lname"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              name="lname"
              placeholder="Required"
              value={formData.lname}
              onChange={(e) => {
                setFormData({ ...formData, lname: e.target.value });
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="+2551234567"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="+2551234567"
              value={formData.address}
              onChange={(e) => {
                setFormData({ ...formData, address: e.target.value });
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              placeholder="Eg Manager, Secretary etc"
              value={formData.role}
              onChange={(e) => {
                setFormData({ ...formData, role: e.target.value });
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-opacity-50"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-600 focus:ring focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
}