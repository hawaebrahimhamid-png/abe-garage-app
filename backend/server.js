const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = require("./middleware/auth");
const pool = require("./db");

// 🔐 JWT SECRET KEY (ADD THIS)
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();

app.use(
  cors({
    origin: "https://abe-garage-app-omega.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ================= REGISTER =================
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCheck = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword],
    );

    res.json({ success: true, user: newUser.rows[0] });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ success: false });
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false });
    }

    const user = result.rows[0];
    // 🔍 DEBUG LOGS (PUT HERE)
    console.log("Entered password:", password);
    console.log("Stored password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

   if (isMatch) {
     // 🔐 CREATE TOKEN
     const token = jwt.sign(
       { userId: user.id, email: user.email },
       JWT_SECRET,
       { expiresIn: "1h" },
     );

     res.json({
       success: true,
       token,
       user,
     })
   } else {
     res.status(401).json({ success: false });
   }
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ success: false });
  }
});
// ================= CUSTOMERS =================
app.get("/customers", verifyToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/customers", verifyToken, async (req, res) => {
  try {
    const { name, phone } = req.body;

    const result = await pool.query(
      "INSERT INTO customers (name, phone) VALUES ($1, $2) RETURNING *",
      [name, phone],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put("/customers/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;

    const result = await pool.query(
      "UPDATE customers SET name=$1, phone=$2 WHERE id=$3 RETURNING *",
      [name, phone, id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/customers/:id", verifyToken, async (req, res) => {
  try {
    await pool.query("DELETE FROM customers WHERE id=$1", [req.params.id]);
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= VEHICLES =================
app.post("/vehicles", verifyToken, async (req, res) => {
  const { customer_id, plate_number, model } = req.body;

  const result = await pool.query(
    "INSERT INTO vehicles (customer_id, plate_number, model) VALUES ($1, $2, $3) RETURNING *",
    [customer_id, plate_number, model],
  );

  res.json(result.rows[0]);
});

// ================= SERVICES =================
app.post("/services", verifyToken, async (req, res) => {
  const { vehicle_id, description, cost } = req.body;

  const result = await pool.query(
    "INSERT INTO services (vehicle_id, description, cost) VALUES ($1, $2, $3) RETURNING *",
    [vehicle_id, description, cost],
  );

  res.json(result.rows[0]);
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
