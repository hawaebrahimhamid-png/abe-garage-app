import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-lg">Page Not Found</p>

      <img
        src="https://source.unsplash.com/600x300/?error,404"
        alt=""
        className="mx-auto mt-6 rounded"
      />

      <Link
        to="/"
        className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
