import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link> |{" "}
      {user?.role === "admin" && <Link to="/admin/jobs">Admin Jobs</Link>}
      {user?.role === "candidate" && <Link to="/jobs">Jobs</Link>} |{" "}
      {user ? (
        <>
          <span>Hi, {user.name}</span> |{" "}
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
