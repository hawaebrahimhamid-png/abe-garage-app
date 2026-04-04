import { Link, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin</h2>

        <nav className="space-y-2">
          <Link to="/admin">Dashboard</Link>
          <br />
          <Link to="/admin/customers">Customers</Link>
          <br />
          <Link to="/admin/vehicles">Vehicles</Link>
          <br />
          <Link to="/admin/services">Services</Link>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
