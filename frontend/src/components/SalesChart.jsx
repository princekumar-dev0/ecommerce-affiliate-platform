import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getSalesReport } from "../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SalesChart() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    try {
      const data = await getSalesReport();
      setReport(data);
    } catch (error) {
      console.error(error);
    }
  }

  const data = {
    labels: report.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Revenue (₹)",
        data: report.map((item) => Number(item.revenue)),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Report",
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <Bar data={data} options={options} />
    </div>
  );
}

export default SalesChart;