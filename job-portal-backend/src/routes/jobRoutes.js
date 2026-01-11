const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middleware/authMiddleware");
const { checkAdmin } = require("../middleware/roleMiddleware");
const { createJob, getJobs, getJobById, updateJob, deleteJob } = require("../controllers/jobController");

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", checkAuth, checkAdmin, createJob);
router.put("/:id", checkAuth, checkAdmin, updateJob);
router.delete("/:id", checkAuth, checkAdmin, deleteJob);

module.exports = router;
