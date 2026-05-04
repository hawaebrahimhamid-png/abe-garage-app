import { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {
  const [counts, setCounts] = useState({
    customers: 0,
    vehicles: 0,
    services: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [c, v, s] = await Promise.all([
          api.get("/customers"),
          api.get("/vehicles"),
          api.get("/services"),
        ]);

        setCounts({
          customers: c.data.length,
          vehicles: v.data.length,
          services: s.data.length,
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview 🚗</h1>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-gray-500">Customers</h2>
          <p className="text-2xl font-bold">{counts.customers}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-gray-500">Vehicles</h2>
          <p className="text-2xl font-bold">{counts.vehicles}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-gray-500">Services</h2>
          <p className="text-2xl font-bold">{counts.services}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
