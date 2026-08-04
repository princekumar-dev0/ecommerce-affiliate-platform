import React, { useState } from "react";

function AdminSettings() {
  const [storeName, setStoreName] = useState("Affiliate Store");
  const [currency, setCurrency] = useState("INR");

  function handleSave(e) {
    e.preventDefault();

    alert("Settings saved successfully.");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          Admin Settings
        </h1>

        <form onSubmit={handleSave} className="space-y-5">

          <div>
            <label className="block mb-2 font-semibold">
              Store Name
            </label>

            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Currency
            </label>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Save Settings
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminSettings;