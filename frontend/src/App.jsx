import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
// Layouts
import MainLayout from "./layout/MainLayout";
import PublicLayout from "./layout/PublicLayout";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Vehicles from "./pages/Vehicles";
import Services from "./pages/Services";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* 🌐 PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Route>

    

      {/* 🔐 ADMIN (PROTECTED) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="services" element={<Services />} />
        </Route>
      </Route>

      {/* ❌ 404 PAGE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
