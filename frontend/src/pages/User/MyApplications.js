import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import JobCard from "../../components/JobCard";

const MyApplications = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(()=>{
    axios.get("/applications/my").then(res=>setJobs(res.data));
  },[]);

  return (
    <div>
      <h2>My Applications</h2>
      {jobs.map(job=><JobCard key={job.job_id} job={job} />)}
    </div>
  );
};

export default MyApplications;
