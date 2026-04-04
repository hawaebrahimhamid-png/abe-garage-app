import { Link, Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div>
      {/* Navbar */}
      <nav className="p-4 bg-blue-600 text-white flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </nav>

      {/* 👇 THIS IS CRITICAL */}
      <Outlet />

      <footer className="p-4 text-center bg-gray-100">© 2026 Abe Garage</footer>
    </div>
  );
}

export default PublicLayout;
