"use client";
import { useEffect, useState } from "react";

import React from "react";
import { toast } from "react-hot-toast";

export default function AddUser() {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    phone: "",
    address: "",
    role: "",
  });
  useEffect(() => {
    async function getRoles() {
      const response = await fetch(`http://localhost:3000/api/users`, {
        cache: "no-store",
      });
      const roleData = await response.json();
      setRoles(roleData);
    }
    getRoles();
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Adding user");

    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // Checking if the response was okay.

    if (response.ok) {
      toast.success("User was added successfully");
      setFormData({
        fname: "",
        mname: "",
        lname: "",
        phone: "",
        address: "",
        role: "",
      });
    } else {
      toast.error("Failed to add user");
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
              placeholder="Eg 05 Mbeya"
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
              placeholder="Enter role"
              value={formData.role}
              onChange={(e) => {
                setFormData({ ...formData, role: e.target.value });
              }}
              list="role-list"
              className="block text-sm py-3 px-4 mt-3 mb-10 rounded-lg w-full border outline-none"
              required
            />
            <datalist id="role-list">
              {roles.map((role) => (
                <option
                  key={role.id}
                  value={role.name}
                  className="capitalize"
                />
              ))}
            </datalist>
          </div>
        </div>
        <button
          type="submit"
          className="bg-sky-900 hover:bg-sky-700 text-white px-4 py-2 rounded  focus:ring focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
