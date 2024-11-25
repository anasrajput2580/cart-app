const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

const app = express();
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(bodyParser.json());

// MySQL connection with retry logic
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to the MySQL database");
    connection.release(); // Release the connection back to the pool
  }
});

// Register API endpoint
app.post("/api/register", async (req, res) => {
  const { name, email, password, cellno } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("All fields are required.");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (name, email, password, cellno) VALUES (?, ?, ?, ?)";
    const [result] = await db.promise().query(query, [name, email, hashedPassword, cellno]);
    res.status(201).send("User registered successfully.");
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).send("Email already exists.");
    } else {
      console.error("Error saving user:", err);
      res.status(500).send("Error saving user.");
    }
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);

    if (results.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ success: true, token });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error");
  }
});

// Validate user
app.post("/api/validate-user", async (req, res) => {
  const { email, username } = req.body;

  if (!email || !username) {
    return res.status(400).json({ message: "Email and username are required." });
  }

  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM users WHERE LOWER(email) = ? AND LOWER(name) = ?",
      [email.trim().toLowerCase(), username.trim()]
    );

    if (rows.length > 0) {
      res.json({ message: "User validated." });
    } else {
      res.status(404).json({ message: "Invalid email or username." });
    }
  } catch (err) {
    console.error("Error during validation:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// Reset password
app.post("/api/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await db.promise().query(
      "UPDATE users SET password = ? WHERE email = ?",
      [hashedPassword, email]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Password successfully updated." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ message: "Failed to update password." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
