import React, { useEffect, useState } from "react";
import { getNotifications } from "../services/api";

function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    const data = await getNotifications();
    setNotifications(data);
  }

  return (
    <div className="max-w-5xl mx-auto py-10">

      <h1 className="text-4xl font-bold mb-8">
        Notifications
      </h1>

      <div className="space-y-4">

        {notifications.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-5"
          >

            <h2 className="text-xl font-bold">
              {item.title}
            </h2>

            <p className="mt-2 text-gray-700">
              {item.message}
            </p>

            <p className="text-sm text-gray-500 mt-3">
              {item.created_at}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminNotifications;