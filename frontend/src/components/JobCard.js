import { Link } from "react-router-dom";

const JobCard = ({ job, children }) => {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <p>{job.location} | {job.job_type}</p>
      <Link to={`/jobs/${job.job_id}`}>View Details</Link>
      {children}
    </div>
  );
};

export default JobCard;
