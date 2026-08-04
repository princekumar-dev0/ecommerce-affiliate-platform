import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/api";

function EditProfile() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await updateProfile(formData);

    alert(result.message);

    if (result.success) {

      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      localStorage.setItem(
        "userName",
        formData.name
      );

      localStorage.setItem(
        "userEmail",
        formData.email
      );

      navigate("/profile");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">

        <h1 className="text-3xl font-bold mb-8">
          Edit Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            placeholder="Full Name"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            placeholder="Email"
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Update Profile
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProfile;