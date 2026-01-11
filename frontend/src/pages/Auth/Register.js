import { useState, useContext } from "react";
import axios from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"candidate" });
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => setForm({...form,[e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    try{
      const res = await axios.post("/auth/register", form);
      const loginRes = await axios.post("/auth/login", { email: form.email, password: form.password });
      loginUser(loginRes.data);
      navigate(loginRes.data.user.role === "admin"? "/admin/jobs": "/jobs");
    } catch(err){ alert(err.response.data.message); }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <select name="role" onChange={handleChange} value={form.role}>
        <option value="candidate">Candidate</option>
        <option value="admin">Admin</option>
      </select>
      <button>Register</button>
    </form>
  );
};

export default Register;
