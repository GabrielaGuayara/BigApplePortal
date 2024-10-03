import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Building2, DollarSign, Briefcase, LogIn, HomeIcon } from 'lucide-react';
import ApiService from '../../Service/ApiService';
import Logo from "../../images/logo.png";

const Navbar = () => {
  const isAuthenticated = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();
  const isEmployee = ApiService.isEmployee();
  const isEmployer = ApiService.isEmployer();
  const navigate = useNavigate();

  const handleLogout = () => {
    const isLogout = window.confirm("Are you sure you want to logout?");
    if (isLogout) {
      ApiService.logout();
      navigate('/home');
    }
  };

  return (
    <nav className="bg-blue text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold mb-2 md:mb-0">
          <img src={Logo} alt="website logo" className="w-36" />
        </NavLink>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <NavLink to="/home" className="hover:text-yellow transition-colors duration-200 flex items-center">
            <HomeIcon className="mr-1" size={18} />
            Home
          </NavLink>
         
          {isEmployee && (
            <>
              <NavLink to="/opportunities" className="hover:text-yellow transition-colors duration-200 flex items-center">
                <Briefcase className="mr-1" size={18} />
                Opportunities
              </NavLink>
              <NavLink to="/find-salaries" className="hover:text-yellow transition-colors duration-200 flex items-center">
                <DollarSign className="mr-1" size={18} />
                Find Salaries
              </NavLink>
            </>
          )}
          
          <NavLink to="/welcome-employers" className="hover:text-yellow transition-colors duration-200 flex items-center">
            <Building2 className="mr-1" size={18} />
            Employer Page
          </NavLink>

          {isAdmin && (
            <NavLink to="/admin-dashboard" className="hover:text-yellow transition-colors duration-200 flex items-center">
              Admin Dashboard
            </NavLink>
          )}

          {isEmployer && (
            <NavLink to="/employer-dashboard" className="hover:text-yellow transition-colors duration-200 flex items-center">
              Dashboard
            </NavLink>
          )}

          {isEmployee && (
            <NavLink to="/user-profile" className="hover:text-yellow transition-colors duration-200 flex items-center">
              Profile
            </NavLink>
          )}

            <NavLink to="/contact" className="hover:text-yellow transition-colors duration-200 flex items-center">
               Contact
              </NavLink>
          {!isAuthenticated && (
            <>
             
              <NavLink to="/signup" className="hover:text-yellow transition-colors duration-200 flex items-center">
                Sign Up
              </NavLink>
              <NavLink to="/login" className="bg-yellow text-blue hover:bg-yellow-400 px-4 py-2 rounded transition-colors duration-200 flex items-center">
                <LogIn className="mr-1" size={18} />
                Login
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <NavLink to="/login" className="bg-yellow text-blue hover:bg-yellow-400 px-4 py-2 rounded transition-colors duration-200 flex items-center" onClick={handleLogout}>
              Log Out
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
