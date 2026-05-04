import { useState } from "react";
import api from "../api/api";

function Services() {
  const [vehicle, setVehicle] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");

  const [services, setServices] = useState([]);

  // fake vehicles (later from backend)
  const vehicleList = [
    { id: 1, plate: "AA-1234" },
    { id: 2, plate: "BB-5678" },
  ];

 const handleAddService = async () => {
   if (!vehicle || !cost || !description) {
     alert("Please fill all fields");
     return;
   }

   try {
     const res = await api.post("/services", {
       vehicle_id: vehicle,
       description,
       cost,
     });

     setServices([...services, res.data]);

     setVehicle("");
     setCost("");
     setDescription("");
   } catch (error) {
     console.error(error);
     alert("Failed to add service");
   }
 };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Services 🔧</h1>

      {/* FORM */}
      <div className="bg-white p-5 rounded shadow mb-6">
        <h2 className="font-bold mb-3">Add Service</h2>

        {/* Vehicle dropdown */}
        <select
          className="border p-2 w-full mb-3"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        >
          <option value="">Select Vehicle</option>
          {vehicleList.map((v) => (
            <option key={v.id} value={v.id}>
              {v.plate}
            </option>
          ))}
        </select>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Cost"
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleAddService}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Service
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-bold mb-3">Service List</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Vehicle</th>
              <th className="p-2 border">Cost</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-3 text-gray-500">
                  No services yet
                </td>
              </tr>
            ) : (
              services.map((s) => (
                <tr key={s.id}>
                  <td className="p-2 border">
                    {vehicleList.find((v) => v.id == s.vehicle_id)?.plate}
                  </td>
                  <td className="p-2 border">{s.cost}</td>
                  <td className="p-2 border">{s.description}</td>
                  <td className="p-2 border">-</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Services;
