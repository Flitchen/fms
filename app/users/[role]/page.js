"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaPen, FaTrashCan } from "react-icons/fa6";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";

export default function Table({ params }) {
  const { data: session } = useSession();
  const { user } = session;
  return (
    <>
      {user.user.role === 1 ? (
        <>
          <h1 className="text-center text-5xl capitalize">{params.role}</h1>

          <div className="container mx-auto py-10">
            <h2 className="text-xl capitalize font-semibold mb-4">
              A list of {params.role}
            </h2>
            <TableList role={params.role} />
          </div>
        </>
      ) : (
        <h1 className="text-center text-5xl mt-14">Unauthorized page</h1>
      )}
    </>
  );
}

function TableList({ role }) {
  const [users, setUsers] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`http://localhost:3000/api/users/${role}`, {
        cache: "no-store",
      });
      const userData = await response.json();
      setUsers(userData);
    }
    getUsers();
  }, [users]);
  return (
    <>
      {users.length !== 0 ? (
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user.id} className="text-center hover:bg-gray-100">
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
                      {user.middle_name === "" ? "-" : user.middle_name}
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
                          <FaPen className="text-sky-500 " />
                        </div>
                      </Link>
                      <div
                        className="hover:bg-gray-300 p-2 rounded"
                        onClick={(e) => {
                          setDeleting((prev) => !prev);
                        }}
                      >
                        <FaTrashCan className="text-red-400 " />
                      </div>
                      {deleting === true ? (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                          <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
                          <div className="relative bg-white w-64 p-4 rounded-lg shadow-md">
                            <div className="font-semibold text-lg mb-2">
                              Delete Confirmation
                            </div>
                            <div className="text-gray-600 mb-4">
                              Are you sure you want to delete this user?
                            </div>
                            <div className="flex justify-end">
                              <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                                onClick={async () => {
                                  toast.loading(
                                    `Deleting {user.first_name} {user.last_name}`
                                  );
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
                                      toast.success(
                                        "User was deleted successfully"
                                      );
                                      router.push(`/users/${params.role}`);
                                    }
                                  } catch (error) {
                                    console.log(error);
                                  } finally {
                                    setDeleting((prev) => !prev);
                                  }
                                }}
                              >
                                Delete
                              </button>
                              <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                onClick={(e) => {
                                  setDeleting((prev) => !prev);
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
