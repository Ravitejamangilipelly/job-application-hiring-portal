import { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import JobCard from "../../components/JobCard";

const MyFavourites = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(()=>{
    axios.get("/favourites/my").then(res=>setJobs(res.data));
  },[]);

  const removeSaved = async (id) => { await axios.delete(`/favourites/${id}`); setJobs(jobs.filter(j=>j.job_id!==id)); };

  return (
    <div>
      <h2>My Favourites</h2>
      {jobs.map(job=><JobCard key={job.job_id} job={job}><button onClick={()=>removeSaved(job.job_id)}>Remove</button></JobCard>)}
    </div>
  );
};

export default MyFavourites;
