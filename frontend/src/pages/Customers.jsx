import { useState } from "react";

function Customers() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [customers, setCustomers] = useState([]);

  // Add customer (frontend only)
  const handleAddCustomer = () => {
    if (!name || !phone) {
      alert("Please fill all fields");
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name,
      phone,
    };

    setCustomers([...customers, newCustomer]);

    // clear inputs
    setName("");
    setPhone("");
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
          onClick={handleAddCustomer}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Customer
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-bold mb-3">Customer List</h2>

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
      </div>
    </div>
  );
}

export default Customers;
