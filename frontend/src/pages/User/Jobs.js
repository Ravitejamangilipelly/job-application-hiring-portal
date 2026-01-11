import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import JobCard from "../../components/JobCard";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await axios.get("/jobs");
    setJobs(res.data);
  };

  useEffect(()=>{ fetchJobs(); },[]);

  return (
    <div>
      <h2>Jobs</h2>
      {jobs.map(job=><JobCard key={job.job_id} job={job} />)}
    </div>
  );
};

export default Jobs;
