import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="h-14 bg-white shadow flex items-center justify-between px-5">
      <h2 className="font-bold text-lg">Dashboard</h2>

      <div className="flex gap-4">
        <Link to="/login" className="text-blue-600">
          Login
        </Link>

        <Link to="/register" className="text-green-600">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
