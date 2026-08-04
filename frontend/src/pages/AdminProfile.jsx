import React, { useEffect, useState } from "react";
import {
  getAdminProfile,
  updateAdminProfile,
} from "../services/api";

function AdminProfile() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const data = await getAdminProfile();
    setProfile(data);
  }

  function handleChange(e) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await updateAdminProfile(profile);

    if (result.success) {
      alert("Profile Updated Successfully");
    } else {
      alert(result.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          Admin Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Name"
          />

          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="New Password"
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Update Profile
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminProfile;