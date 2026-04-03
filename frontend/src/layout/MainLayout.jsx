import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
