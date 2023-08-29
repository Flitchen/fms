"use client";
import { useEffect, useState } from "react";

export default async function AdminTable({ params }) {
  // const tableData = [
  //   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  //   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  //   { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User" },
  //   // Add more data as needed
  // ];
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      const response = await fetch(
        `http://localhost:3000/api/users/${params?.role}`,
        {
          cache: "no-store",
        }
      );
      const userData = await response.json();
      console.log(userData);
      setUsers(userData);
    }
    getUsers();
  }, []);
  // console.log(users);
  return (
    <>
      <h1 className="text-center text-5xl capitalize">{params.role}</h1>
      <div className="container mx-auto py-10">
        <h2 className="text-xl capitalize font-semibold mb-4">
          A list of {params.role}
        </h2>

        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r"
                >
                  S/N
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r"
                >
                  First Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r"
                >
                  Middle Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r"
                >
                  Last Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r"
                >
                  Phone Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r"
                >
                  Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap border-r">
                    <div className="text-sm text-gray-900">{index + 1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-r">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm capitalize font-medium text-gray-900">
                          {user.first_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-r">
                    <div className="text-sm capitalize text-gray-900">
                      {user.middle_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-r">
                    <div className="text-sm capitalize text-gray-900">
                      {user.last_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-r">
                    <span className="px-2 inline-flex text-sm capitalize leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {user.phone_no}{" "}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap border-r">
                    <span className="px-2 inline-flex text-xs capitalize leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {user.address}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
