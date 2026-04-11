import { useState, useEffect } from "react";
import api from "../api/api";

function Customers() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // ================= LOAD CUSTOMERS =================
  useEffect(() => {
    const loadCustomers = async () => {
      setLoading(true);

      try {
        const res = await api.get("/customers"); // ✅ CLEAN AXIOS
        setCustomers(res.data);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    loadCustomers();
  }, []);

  // ================= ADD CUSTOMER =================
  const addCustomer = async () => {
    if (!name || !phone) {
      alert("Fill all fields");
      return;
    }

    setSaving(true);

    try {
      const res = await api.post("/customers", {
        name,
        phone,
      });

      setCustomers((prev) => [...prev, res.data]);

      setName("");
      setPhone("");
    } catch (err) {
      console.log(err);
    }

    setSaving(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Customers 👤</h1>

      {/* FORM */}
      <div className="bg-white p-5 rounded shadow mb-6">
        <h2 className="font-bold mb-3">Add Customer</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={addCustomer}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {saving ? "Saving..." : "Save Customer"}
        </button>
      </div>

      {/* TABLE + SPINNER */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-bold mb-3">Customer List</h2>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Phone</th>
              </tr>
            </thead>

            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center p-3 text-gray-500">
                    No customers yet
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.id}>
                    <td className="p-2 border">{c.name}</td>
                    <td className="p-2 border">{c.phone}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Customers;
