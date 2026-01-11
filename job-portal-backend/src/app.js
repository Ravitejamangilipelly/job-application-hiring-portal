const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req,res)=> res.send("API Running"));

module.exports = app;
