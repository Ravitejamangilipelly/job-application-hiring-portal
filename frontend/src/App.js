import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

import AdminJobs from "./pages/Admin/AdminJobs";
import JobForm from "./pages/Admin/JobForm";

import Jobs from "./pages/User/Jobs";
import JobDetails from "./pages/User/JobDetails";
import MyApplications from "./pages/User/MyApplications";
import MyFavourites from "./pages/User/MyFavourites";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/admin/jobs" element={<ProtectedRoute role="admin"><AdminJobs /></ProtectedRoute>} />
          <Route path="/admin/jobs/new" element={<ProtectedRoute role="admin"><JobForm /></ProtectedRoute>} />
          <Route path="/admin/jobs/edit/:id" element={<ProtectedRoute role="admin"><JobForm /></ProtectedRoute>} />

          <Route path="/jobs" element={<ProtectedRoute role="candidate"><Jobs /></ProtectedRoute>} />
          <Route path="/jobs/:jobId" element={<ProtectedRoute role="candidate"><JobDetails /></ProtectedRoute>} />
          <Route path="/my-applications" element={<ProtectedRoute role="candidate"><MyApplications /></ProtectedRoute>} />
          <Route path="/my-favourites" element={<ProtectedRoute role="candidate"><MyFavourites /></ProtectedRoute>} />

          <Route path="/" element={<div>Welcome to Job Portal</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
