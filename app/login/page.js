"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

export default function Login() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      ...login,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleLogin}>
        <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
              Login
            </h1>
            <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
              Please sign in in order to access your account!
            </p>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Eg yourlastname@2023"
              value={login.username}
              onChange={(e) => setLogin({ ...login, username: e.target.value })}
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              required
            />
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="py-3 w-64 text-xl text-white bg-gray-800 rounded-2xl"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}