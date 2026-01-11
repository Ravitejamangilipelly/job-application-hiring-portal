const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middleware/authMiddleware");
const { checkCandidate } = require("../middleware/roleMiddleware");
const { saveJob, removeSavedJob, getMyFavourites } = require("../controllers/favouriteController");

router.post("/:jobId", checkAuth, checkCandidate, saveJob);
router.delete("/:jobId", checkAuth, checkCandidate, removeSavedJob);
router.get("/my", checkAuth, checkCandidate, getMyFavourites);

module.exports = router;
