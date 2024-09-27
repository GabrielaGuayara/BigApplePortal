import  Home from "../pages/Home";
import { Route, Routes as R } from "react-router-dom";
import FindSalaries from "../pages/FindSalaries";
import EmployerPage from "../pages/PostAnApprenticeship";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import AdminDashboard from "./adminComponents/AdminDashboard";
import ApprenticeshipDetailPage from "./employeeComponents/ApprenticeshipDetailPage";
import CategoryList from "./adminComponents/CategoryList";
import ViewAllUsers from "./adminComponents/ViewAllUsers";
import ProfilePage from "./employeeComponents/ProfilePage";
import ApprenticeshipSearch from "./apprenticeshipComponents/ApprenticeshipSearch";
import AddApprenticeship from "./EmployerComponents/AddApprenticeship";
import ViewPostedApprenticeship from "./EmployerComponents/ViewPostedApprenticeship";
import EmployerDashboard from "./EmployerComponents/EmployerDashboard";
import AddNewAdminForm from "./adminComponents/AddNewAdminForm";
import EditUser from "./employeeComponents/EditUser";

function Routes() {
  return (
      <R>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/find-salaries" element={<FindSalaries />} />
        <Route path="/opportunities" element={<ApprenticeshipSearch />} />
        <Route path="/welcome-employers" element={<EmployerPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/user-profile" element={<ProfilePage/>} />
        <Route path="/signup" element={<SignUp/>} />


        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/add-new-admin" element={<AddNewAdminForm/>} />
        <Route path="/admin/see-all-categories" element={<CategoryList/>} />
        <Route path="/admin/view-all-users" element={<ViewAllUsers/>} />


        <Route path="/employee/individual-apprenticeship-page/:id" element={<ApprenticeshipDetailPage/>} />
        <Route path="/employee/profile" element={<ProfilePage/>} />
        <Route path="/employee/edit-profile/:userId" element={<EditUser/>} />
       


        <Route path="/employer-dashboard" element={<EmployerDashboard/>} />
        <Route path="/employer/post-apprenticeship" element={<AddApprenticeship/>} />
        <Route path="/employer/view-all-aprenticeship" element={<ViewPostedApprenticeship/>} />

        

      </R>
    
  );
}

export default Routes