const pool = require("../config/db");

// Apply to job
const applyJob = async (req,res)=>{
  const { jobId } = req.params;
  const userId = req.user.user_id;

  try{
    await pool.query("INSERT INTO applications (user_id,job_id) VALUES ($1,$2) ON CONFLICT (user_id,job_id) DO NOTHING",[userId,jobId]);
    res.json({ message:"Applied successfully" });
  } catch(err){ res.status(500).json({ message: err.message }); }
};

// Get my applications
const getMyApplications = async (req,res)=>{
  const userId = req.user.user_id;
  try{
    const result = await pool.query(
      "SELECT a.application_id, j.* FROM applications a JOIN jobs j ON a.job_id=j.job_id WHERE a.user_id=$1",
      [userId]
    );
    res.json(result.rows);
  } catch(err){ res.status(500).json({ message: err.message }); }
};

// Admin: Get applications per job
const getApplicationsByJob = async (req,res)=>{
  const { jobId } = req.params;
  try{
    const result = await pool.query(
      "SELECT a.application_id, u.user_id, u.name, u.email FROM applications a JOIN users u ON a.user_id=u.user_id WHERE a.job_id=$1",
      [jobId]
    );
    res.json(result.rows);
  } catch(err){ res.status(500).json({ message: err.message }); }
};

module.exports = { applyJob, getMyApplications, getApplicationsByJob };
