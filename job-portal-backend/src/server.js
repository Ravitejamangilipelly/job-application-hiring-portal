const express = require("express");
const app = express();
require("dotenv").config();
const pool = require("./config/db");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  pool.connect().then(() => console.log("Connected to PostgreSQL"));
});