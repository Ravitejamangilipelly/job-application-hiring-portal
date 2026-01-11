const pool = require("../config/db");

// Create Job
const createJob = async (req, res) => {
  const { title, description, location, job_type } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO jobs (title,description,location,job_type,created_by) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [title,description,location,job_type,req.user.user_id]
    );
    res.json(result.rows[0]);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Get all jobs with optional filters
const getJobs = async (req, res) => {
  const { search, location, job_type } = req.query;
  let query = "SELECT * FROM jobs WHERE 1=1";
  let params = [];
  if(search){ params.push(`%${search}%`); query += ` AND title ILIKE $${params.length}`; }
  if(location){ params.push(location); query += ` AND location ILIKE $${params.length}`; }
  if(job_type){ params.push(job_type); query += ` AND job_type=$${params.length}`; }

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err){ res.status(500).json({ message: err.message }); }
};

// Get job by ID
const getJobById = async (req,res) => {
  const { id } = req.params;
  try{
    const result = await pool.query("SELECT * FROM jobs WHERE job_id=$1",[id]);
    if(result.rows.length ===0) return res.status(404).json({ message:"Job not found" });
    res.json(result.rows[0]);
  } catch(err){ res.status(500).json({ message: err.message }); }
};

// Update Job
const updateJob = async (req,res) => {
  const { id } = req.params;
  const { title, description, location, job_type } = req.body;
  try{
    const result = await pool.query(
      "UPDATE jobs SET title=$1, description=$2, location=$3, job_type=$4 WHERE job_id=$5 RETURNING *",
      [title, description, location, job_type, id]
    );
    res.json(result.rows[0]);
  } catch(err){ res.status(500).json({ message: err.message }); }
};

// Delete Job
const deleteJob = async (req,res) => {
  const { id } = req.params;
  try{
    await pool.query("DELETE FROM jobs WHERE job_id=$1",[id]);
    res.json({ message:"Job deleted" });
  } catch(err){ res.status(500).json({ message: err.message }); }
};

module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob };
