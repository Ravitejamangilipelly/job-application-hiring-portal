const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

// REGISTER
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!["admin","candidate"].includes(role)) return res.status(400).json({ message: "Invalid role" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING user_id,name,email,role",
      [name,email,hashedPassword,role]
    );
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') res.status(400).json({ message: "Email already exists" });
    else res.status(500).json({ message: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRes = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    const user = userRes.rows[0];
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { user_id: user.user_id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };
