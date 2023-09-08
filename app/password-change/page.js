"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Page() {
  const { data: session } = useSession();
  const { user } = session;
  const userId = user?.user.id;
  const [passwordData, setPasswordData] = useState({
    oldpass: "",
    newpass: "",
    cnewpass: "",
    userId,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/password-change", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    });
    if (response.ok) {
      toast.success("Password changed successfully");
      setPasswordData({
        oldpass: "",
        newpass: "",
        cnewpass: "",
        userId,
      });
    } else {
      toast.error("Failed update password");
    }
  };
  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4  bg-white border rounded shadow"
      >
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-center my-4 cursor-pointer">
            Change password
          </h1>
        </div>
        <div className="space-y-3 mb-4">
          <label
            htmlFor="oldpass"
            className="block text-sm font-medium text-gray-700"
          >
            Old Password
          </label>
          <input
            type="text"
            id="oldpass"
            name="oldpass"
            placeholder="Enter your old Password"
            value={passwordData.oldpass}
            autoComplete="off"
            onChange={(e) => {
              setPasswordData({ ...passwordData, oldpass: e.target.value });
            }}
            className="block text-sm py-3 px-4 my-10 rounded-lg w-full border outline-none"
            required
          />
        </div>
        <div className="space-y-3 mb-4">
          <label
            htmlFor="newpass"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="text"
            id="newpass"
            name="newpass"
            placeholder="Enter your new Password"
            value={passwordData.newpass}
            autoComplete="off"
            onChange={(e) => {
              setPasswordData({ ...passwordData, newpass: e.target.value });
            }}
            className="block text-sm py-3 px-4 my-10 rounded-lg w-full border outline-none"
            required
          />
        </div>
        <div className="space-y-3 mb-4">
          <label
            htmlFor="cnewpass"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            type="text"
            id="cnewpass"
            name="cnewpass"
            placeholder="Confirm your new Password"
            value={passwordData.cnewpass}
            autoComplete="off"
            onChange={(e) => {
              setPasswordData({ ...passwordData, cnewpass: e.target.value });
            }}
            className="block text-sm py-3 px-4 my-10 rounded-lg w-full border outline-none"
            required
          />
        </div>
        <div className="text-center mt-6">
          <button className="py-3 w-64 text-xl text-white bg-sky-900 hover:bg-sky-700 rounded-2xl">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}
