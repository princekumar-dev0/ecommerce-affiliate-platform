import React from "react";
import { Link } from "react-router-dom";

function Profile() {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Please login first.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-5xl mx-auto py-10">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <div className="flex items-center gap-6">

            <img
              src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
              alt="Profile"
              className="w-28 h-28 rounded-full"
            />

            <div>

              <h1 className="text-3xl font-bold">
                {user.name}
              </h1>

              <p className="text-gray-600 mt-2">
                {user.email}
              </p>

              <span className="inline-block mt-3 px-4 py-1 bg-blue-600 text-white rounded-full">
                {user.role}
              </span>

            </div>

          </div>

          <hr className="my-8" />

          <div className="grid md:grid-cols-2 gap-5">

            <Link
              to="/edit-profile"
              className="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700"
            >
              Edit Profile
            </Link>

            <Link
              to="/change-password"
              className="bg-orange-500 text-white p-4 rounded-lg text-center hover:bg-orange-600"
            >
              Change Password
            </Link>

            <Link
              to="/wishlist"
              className="bg-pink-500 text-white p-4 rounded-lg text-center hover:bg-pink-600"
            >
              My Wishlist
            </Link>

            <Link
              to="/my-orders"
              className="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700"
            >
              My Orders
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;