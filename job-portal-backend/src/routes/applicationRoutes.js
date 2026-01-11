const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middleware/authMiddleware");
const { checkCandidate } = require("../middleware/roleMiddleware");
const { applyJob, getMyApplications } = require("../controllers/applicationController");

router.post("/:jobId", checkAuth, checkCandidate, applyJob);
router.get("/my", checkAuth, checkCandidate, getMyApplications);

module.exports = router;
