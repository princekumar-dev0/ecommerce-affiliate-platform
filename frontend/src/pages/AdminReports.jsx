import React, { useEffect, useState } from "react";
import { getSalesReport } from "../services/api";

function AdminReports() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    const data = await getSalesReport();
    setReport(data);
  }


  function exportCSV() {
  if (report.length === 0) {
    alert("No data available.");
    return;
  }

  const headers = ["Month", "Revenue", "Orders"];

  const rows = report.map((item) => [
    item.month,
    item.revenue,
    item.orders,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "sales_report.csv";

  link.click();

  URL.revokeObjectURL(url);
}


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Sales Report
        </h1>

        <button
  onClick={exportCSV}
  className="mb-6 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
>
  Export CSV
</button>

        <div className="bg-white rounded-lg shadow overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Month</th>
                <th className="p-3 text-left">Revenue</th>
                <th className="p-3 text-left">Orders</th>
              </tr>
            </thead>

            <tbody>

              {report.map((item) => (

                <tr key={item.month} className="border-b">

                  <td className="p-3">
                    {item.month}
                  </td>

                  <td className="p-3 text-green-600 font-semibold">
                    ₹{item.revenue}
                  </td>

                  <td className="p-3">
                    {item.orders}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default AdminReports;