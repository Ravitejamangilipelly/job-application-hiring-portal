import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { Link } from "react-router-dom";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await axios.get("/jobs");
    setJobs(res.data);
  };

  const deleteJob = async (id) => {
    if(window.confirm("Delete this job?")){
      await axios.delete(`/jobs/${id}`);
      fetchJobs();
    }
  };

  useEffect(()=>{ fetchJobs(); },[]);

  return (
    <div>
      <h2>Admin Jobs</h2>
      <Link to="/admin/jobs/new">Create New Job</Link>
      {jobs.map(job=>(
        <div key={job.job_id}>
          <h3>{job.title}</h3>
          <button><Link to={`/admin/jobs/edit/${job.job_id}`}>Edit</Link></button>
          <button onClick={()=>deleteJob(job.job_id)}>Delete</button>
          <button><Link to={`/admin/jobs/${job.job_id}/applications`}>View Applications</Link></button>
        </div>
      ))}
    </div>
  );
};

export default AdminJobs;
