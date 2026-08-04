import React, { useEffect, useState } from "react";
import { getActivityLogs } from "../services/api";

function ActivityLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    const data = await getActivityLogs();
    setLogs(data);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Activity Logs
        </h1>

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-200">

              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Activity</th>
                <th className="p-3 text-left">Date</th>
              </tr>

            </thead>

            <tbody>

              {logs.map((log) => (

                <tr
                  key={log.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">{log.id}</td>

                  <td className="p-3">{log.activity}</td>

                  <td className="p-3">{log.created_at}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ActivityLogs;