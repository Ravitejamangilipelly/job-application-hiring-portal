import { useState, useContext } from "react";
import axios from "../../api/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email:"", password:"" });
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => setForm({...form,[e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    try{
      const res = await axios.post("/auth/login", form);
      loginUser(res.data);
      navigate(res.data.user.role === "admin"? "/admin/jobs": "/jobs");
    } catch(err){ alert(err.response.data.message); }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button>Login</button>
    </form>
  );
};

export default Login;
