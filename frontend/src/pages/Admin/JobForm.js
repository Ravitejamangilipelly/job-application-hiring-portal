import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";

const JobForm = () => {
  const [form, setForm] = useState({ title:"", description:"", location:"", job_type:"Full-time" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(()=>{
    if(id){
      axios.get(`/jobs/${id}`).then(res=> setForm(res.data));
    }
  },[id]);

  const handleChange = e => setForm({...form,[e.target.name]: e.target.value});
  const handleSubmit = async e => {
    e.preventDefault();
    if(id) await axios.put(`/jobs/${id}`, form);
    else await axios.post("/jobs", form);
    navigate("/admin/jobs");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Edit Job" : "Create Job"}</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required/>
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required/>
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
      <select name="job_type" value={form.job_type} onChange={handleChange}>
        <option>Full-time</option>
        <option>Internship</option>
        <option>Remote</option>
      </select>
      <button>Save</button>
    </form>
  );
};

export default JobForm;
