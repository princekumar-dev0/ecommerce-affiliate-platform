import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api";
import { addActivity } from "../services/api";

function AdminCustomers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
const usersPerPage = 5;
  

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(value) {
    setSearch(value);

    const filtered = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
      );
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }

  async function handleDelete(id) {
    const ok = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!ok) return;

    const result = await deleteUser(id);

    if (result.success) {

      await addActivity(
  `Deleted customer ID: ${id}`
);

      alert("Customer deleted successfully.");
      loadUsers();
    } else {
      alert(result.message);
    }
  }

  const lastIndex = currentPage * usersPerPage;
const firstIndex = lastIndex - usersPerPage;

const currentUsers = filteredUsers.slice(firstIndex, lastIndex);

const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Customers
          </h1>

          <button
            onClick={loadUsers}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            Refresh
          </button>

        </div>

        <div className="mb-4">
  <span className="text-lg font-semibold">
    Total Customers: {filteredUsers.length}
  </span>
</div>

        <input
          type="text"
          placeholder="Search by Name or Email..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full md:w-96 border rounded-lg px-4 py-2 mb-6"
        />

        {loading ? (

          <div className="bg-white rounded-lg shadow p-8 text-center">
            Loading customers...
          </div>

        ) : filteredUsers.length === 0 ? (

          <div className="bg-white rounded-lg shadow p-8 text-center">
            No customers found.
          </div>

        ) : (

          <div className="bg-white rounded-lg shadow overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-gray-200">

                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-center">Delete</th>
                </tr>

              </thead>

              <tbody>

                {currentUsers.map((user) => (

                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {user.id}
                    </td>

                    <td className="p-3">
                      {user.name}
                    </td>

                    <td className="p-3">
                      {user.email}
                    </td>

                    <td className="p-3 text-center">

                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>


            <div className="flex justify-center gap-3 mt-6 mb-4">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span className="px-4 py-2 font-semibold">
    Page {currentPage} of {totalPages || 1}
  </span>

  <button
    disabled={currentPage === totalPages || totalPages === 0}
    onClick={() => setCurrentPage(currentPage + 1)}
    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
  >
    Next
  </button>

</div>

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminCustomers;