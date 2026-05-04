import { useState } from "react";
import api from "../api/api";

function Vehicles() {
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [customer, setCustomer] = useState("");
  const [vehicles, setVehicles] = useState([]);

  // fake customers (we will replace with backend later)
  const customersList = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Sara Ali" },
  ];

 const handleAddVehicle = async () => {
   if (!plate || !model || !customer) {
     alert("Please fill all fields");
     return;
   }

   try {
     const res = await api.post("/vehicles", {
       customer_id: customer,
       plate_number: plate,
       model,
     });

     setVehicles((prev) => [...prev, res.data]);

     setPlate("");
     setModel("");
     setCustomer("");
   } catch (error) {
     console.error(error);
     alert("Failed to add vehicle");
   }
 };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Vehicles 🚗</h1>

      {/* FORM */}
      <div className="bg-white p-5 rounded shadow mb-6">
        <h2 className="font-bold mb-3">Add Vehicle</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Plate Number"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />

        {/* Customer dropdown */}
        <select
          className="border p-2 w-full mb-3"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        >
          <option value="">Select Customer</option>
          {customersList.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddVehicle}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Vehicle
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-bold mb-3">Vehicle List</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Plate</th>
              <th className="p-2 border">Model</th>
              <th className="p-2 border">Customer</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-3 text-gray-500">
                  No vehicles yet
                </td>
              </tr>
            ) : (
              vehicles.map((v) => (
                <tr key={v.id}>
                  <td className="p-2 border">{v.plate_number}</td>
                  <td className="p-2 border">{v.model}</td>
                  <td className="p-2 border">
                    {customersList.find((c) => c.id == v.customer_id)?.name}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vehicles;
