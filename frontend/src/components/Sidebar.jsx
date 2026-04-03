function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">🚗 Garage App</h1>

      <ul className="space-y-4">
        <li className="cursor-pointer hover:text-blue-400">Dashboard</li>
        <li className="cursor-pointer hover:text-blue-400">Customers</li>
        <li className="cursor-pointer hover:text-blue-400">Vehicles</li>
        <li className="cursor-pointer hover:text-blue-400">Services</li>
      </ul>
    </div>
  );
}

export default Sidebar;
