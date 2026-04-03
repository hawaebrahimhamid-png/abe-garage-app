function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview 🚗</h1>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-gray-500">Customers</h2>
          <p className="text-2xl font-bold">120</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-gray-500">Vehicles</h2>
          <p className="text-2xl font-bold">85</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-gray-500">Services</h2>
          <p className="text-2xl font-bold">42</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
