import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(()=>{ axios.get(`/jobs/${jobId}`).then(res=>setJob(res.data)); },[jobId]);

  const applyJob = async () => { await axios.post(`/applications/${jobId}`); alert("Applied!"); };
  const saveJob = async () => { await axios.post(`/favourites/${jobId}`); alert("Saved!"); };

  if(!job) return <p>Loading...</p>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p>{job.location} | {job.job_type}</p>
      {user?.role === "candidate" && (
        <>
          <button onClick={applyJob}>Apply</button>
          <button onClick={saveJob}>Save</button>
        </>
      )}
    </div>
  );
};

export default JobDetails;
