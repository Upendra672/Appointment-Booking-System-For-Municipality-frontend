import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import ApplyDepartment from "./pages/ApplyDepartment";
import Notifications from "./pages/Notifications";
import DepartmentsList from "./pages/Admin/DepartmentsList";
import UsersList from "./pages/Admin/UsersList";
import Profile from "./pages/Department/Profile";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments"
import DepartmentAppointment from "./pages/Department/DepartmentAppointment";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      <Router>
        {loading && (
          <div className="spinner-parent">
            <div class="spinner-border" role="status"></div>
          </div>
        )}
        <Toaster position="top-center" reverseOrder={false}/>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/apply-department" element={<ProtectedRoute><ApplyDepartment/></ProtectedRoute>}/>
          <Route path="/notifications" element={<ProtectedRoute><Notifications/></ProtectedRoute>}/>
          <Route path="/admin/userslist" element={<ProtectedRoute><UsersList/></ProtectedRoute>}/>
          <Route path="/admin/departmentlist" element={<ProtectedRoute><DepartmentsList/></ProtectedRoute>}/>
          <Route path="/department/profile/:userId" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path="/book-appointment/:departmentId" element={<ProtectedRoute><BookAppointment/></ProtectedRoute>}/>
          <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>}/>
          <Route path="/department/appointments" element={<ProtectedRoute><DepartmentAppointment/></ProtectedRoute>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
