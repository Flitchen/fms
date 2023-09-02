"use client";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AdminTable({ params }) {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const handleDelete = async (id) => {
    const hasConfirmed = confirm("Are sure you want to delete this user?");
    if (hasConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/update-user/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          toast.error("Failed to delete user");
        } else {
          toast.success("User was deleted successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    async function getUsers() {
      const response = await fetch(
        `http://localhost:3000/api/users/${params?.role}`,
        {
          cache: "no-store",
        }
      );
      const userData = await response.json();
      setUsers(userData);
    }
    getUsers();
  }, [users]);
  return (
    <>
      <h1 className="text-center text-5xl capitalize">{params.role}</h1>
      <div className="container mx-auto py-10">
        <h2 className="text-xl capitalize font-semibold mb-4">
          A list of {params.role}
        </h2>

        <div className="shadow overflow-auto border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 ">
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
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r"
                >
                  Edit or Delete
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
                  <td className="px-6 py-4 whitespace-nowrap border-r">
                    <div className="flex justify-around">
                      <Link href={`/users/update-user/${user.id}`} passHref>
                        <div className="hover:bg-gray-300 p-2 rounded">
                          <FontAwesomeIcon icon={faPen} />
                        </div>
                      </Link>
                      <div
                        className="hover:bg-gray-300 p-2 rounded"
                        onClick={async () => {
                          const hasConfirmed = confirm(
                            `Are sure you want to delete  ${user.first_name} ${user.last_name}?`
                          );
                          if (hasConfirmed) {
                            try {
                              const response = await fetch(
                                `http://localhost:3000/api/update-user/${user.id}`,
                                {
                                  method: "DELETE",
                                }
                              );
                              if (!response.ok) {
                                toast.error("Failed to delete user");
                              } else {
                                toast.success("User was deleted successfully");
                                router.push(`/users/${params.role}`);
                              }
                            } catch (error) {
                              console.log(error);
                            }
                          }
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </div>
                    </div>
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
