import  Home from "../pages/Home";
import { Route, Routes as R } from "react-router-dom";
import FindSalaries from "../pages/FindSalaries";
import EmployerPage from "../pages/EmployerPage";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import AdminDashboard from "../components/adminComponents/AdminDashboard";
import ApprenticeshipDetailPage from "../components/employeeComponents/ApprenticeshipDetailPage";
import ViewAllUsers from "../components/adminComponents/ViewAllUsers";
import ProfilePage from "../components/employeeComponents/ProfilePage";
import ApprenticeshipSearch from "../components/apprenticeshipComponents/ApprenticeshipSearch";
import AddApprenticeship from "../components/EmployerComponents/AddApprenticeship";
import ViewPostedApprenticeship from "../components/EmployerComponents/ViewPostedApprenticeship";
import EmployerDashboard from "../components/EmployerComponents/EmployerDashboard";
import AddNewAdminForm from "../components/adminComponents/AddNewAdminForm";
import EditUser from "../components/employeeComponents/EditUser";
import ViewApplicants from "../components/EmployerComponents/ViewApplicants";
import ApprenticeshipDisplay from "../pages/ApprenticeshipDisplay";

function Routes() {
  return (
      <R>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/find-salaries" element={<FindSalaries />} />
        <Route path="/opportunities" element={<ApprenticeshipDisplay/>} />
        <Route path="/welcome-employers" element={<EmployerPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/user-profile" element={<ProfilePage/>} />
        <Route path="/signup" element={<SignUp/>} />


        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/add-new-admin" element={<AddNewAdminForm/>} />
        <Route path="/admin/view-all-users" element={<ViewAllUsers/>} />


        <Route path="/employee/individual-apprenticeship-page/:id" element={<ApprenticeshipDetailPage/>} />
        <Route path="/employee/profile" element={<ProfilePage/>} />
        <Route path="/employee/edit-profile/:userId" element={<EditUser/>} />
       


        <Route path="/employer-dashboard" element={<EmployerDashboard/>} />
        <Route path="/employer/post-apprenticeship" element={<AddApprenticeship/>} />
        <Route path="/employer/view-all-aprenticeship" element={<ViewPostedApprenticeship/>} />
        <Route path="/employer/view-applicants/:id" element={<ViewApplicants/>} />

        

      </R>
    
  );
}

export default Routes