import  Home from "../pages/Home";
import { Route, Routes as R } from "react-router-dom";
import FindSalaries from "../pages/FindSalaries";
import EmployerPage from "../pages/PostAnApprenticeship";
import SignUp from "../pages/SignUp";
import Login from "../pages/login";
import AddNewCategoryForm from "./adminComponents/AddNewCategoryForm";
import AdminDashboard from "./adminComponents/AdminDashboard";
import ApprenticeshipDetailPage from "./employeeComponents/ApprenticeshipDetailPage";

function Routes() {
  return (
      <R>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/find-salaries" element={<FindSalaries />} />
        <Route path="/welcome-employers" element={<EmployerPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/add-new-category" element={<AddNewCategoryForm/>} />
        <Route path="/employee/individual-apprenticeship-page/:id" element={<ApprenticeshipDetailPage/>} />

      </R>
    
  );
}

export default Routes