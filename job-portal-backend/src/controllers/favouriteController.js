const pool = require("../config/db");

// Save job
const saveJob = async (req,res)=>{
  const userId = req.user.user_id;
  const { jobId } = req.params;
  try{
    await pool.query("INSERT INTO favourites (user_id,job_id) VALUES ($1,$2) ON CONFLICT (user_id,job_id) DO NOTHING",[userId,jobId]);
    res.json({ message:"Saved successfully" });
  } catch(err){ res.status(500).json({ message: err.message }); }
};

// Remove saved job
const removeSavedJob = async (req,res)=>{
  const userId = req.user.user_id;
  const { jobId } = req.params;
  try{
    await pool.query("DELETE FROM favourites WHERE user_id=$1 AND job_id=$2",[userId,jobId]);
    res.json({ message:"Removed successfully" });
  } catch(err){ res.status(500).json({ message: err.message }); }
};

// Get my saved jobs
const getMyFavourites = async (req,res)=>{
  const userId = req.user.user_id;
  try{
    const result = await pool.query(
      "SELECT f.favourite_id, j.* FROM favourites f JOIN jobs j ON f.job_id=j.job_id WHERE f.user_id=$1",
      [userId]
    );
    res.json(result.rows);
  } catch(err){ res.status(500).json({ message: err.message }); }
};

module.exports = { saveJob, removeSavedJob, getMyFavourites };
