import { Link, Outlet, useNavigate } from "react-router-dom";

function MainLayout() {
  const navigate = useNavigate();

  // 👇 PUT IT HERE
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    navigate("/login");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin</h2>
        {/* 🔴 Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded mb-4 w-full"
        >
          Logout
        </button>
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
