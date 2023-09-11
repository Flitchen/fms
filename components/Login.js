"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      ...login,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error);
      }
      if (callback?.ok && !callback?.error) {
        router.refresh();
      }
    });
  };
  return (
    <div className="py-6 bg-sky-700 w-screen h-screen">
      <form onSubmit={handleLogin}>
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto my-16 max-w-sm lg:max-w-4xl">
          <div className="hidden lg:block lg:w-1/2 bg-cover bg-white-smoke bg-[url('../public/vlriuos.jpg')]">
            <h2 className="text-orange-400 text-3xl font-medium text-center mt-1">
              File<span className="text-black"> Management </span>System
            </h2>
          </div>
          <div className="w-full p-8 lg:w-1/2">
            <span className="text-black text-[45px] font-medium ml-36">4</span>
            <span className="text-orange-600 text-3xl font-medium">SITE</span>
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase"
              >
                login with credentials
              </a>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                className="bg-white text-gray-700 shadow-sm focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-2 px-4 block w-full appearance-none"
                type="text"
                name="username"
                placeholder="lastname@2023"
                autoComplete="off"
                value={login.username}
                onChange={(e) =>
                  setLogin({ ...login, username: e.target.value })
                }
                required
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                className="bg-white text-gray-700 shadow-sm focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-2 px-4 block w-full appearance-none"
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="off"
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
                required
              />
            </div>
            <div className="mt-8">
              <button
                className="bg-orange-600 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <a href="#" className="text-xs text-gray-500 uppercase">
                forget password
              </a>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
