const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Get all customers
app.get("/customers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// 👉 ADD YOUR NEW API HERE
// customers route
app.post("/customers", async (req, res) => {
  try {
    const { name, phone } = req.body;

    const newCustomer = await pool.query(
      "INSERT INTO customers (name, phone) VALUES ($1, $2) RETURNING *",
      [name, phone]
    );

    res.json(newCustomer.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// VEHICLES ROUTE
app.post("/vehicles", async (req, res) => {
  const { customer_id, plate_number, model } = req.body;

  const result = await pool.query(
    "INSERT INTO vehicles (customer_id, plate_number, model) VALUES ($1, $2, $3) RETURNING *",
    [customer_id, plate_number, model],
  );

  res.json(result.rows[0]);
});

//SERVICES ROUTE
app.post("/services", async (req, res) => {
  const { vehicle_id, description, cost } = req.body;

  const result = await pool.query(
    "INSERT INTO services (vehicle_id, description, cost) VALUES ($1, $2, $3) RETURNING *",
    [vehicle_id, description, cost],
  );

  res.json(result.rows[0]);
});

//UPDATE (PUT) — edit a customer
app.put("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;

    const result = await pool.query(
      "UPDATE customers SET name=$1, phone=$2 WHERE id=$3 RETURNING *",
      [name, phone, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//DELETE — remove a customer
app.delete("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM customers WHERE id=$1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Start server (ALWAYS LAST)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
