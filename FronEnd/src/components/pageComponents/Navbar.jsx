import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Building2, DollarSign, Briefcase, LogIn } from 'lucide-react'
import ApiService from '../../Service/ApiService';
import Logo from "../../assets/logo.png"



const Navbar = () => {
  
  const isAuthenticated = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();
  const isEmployee = ApiService.isEmployee();
  const isEmployer = ApiService.isEmployer();
  const navigate = useNavigate();

  const handleLogout= () =>{
    const isLogout = window.confirm("Are you sure you want to logout?")
      if(isLogout){
        ApiService.logout();
        navigate('/home')
      }


  }

    return (
        <>
<nav className=" bg-[#023e8a] text-base-content text-white p-4">
<div className="container mx-auto flex justify-between items-center">
      <NavLink to="/" className="text-2xl font-bold"><img src={Logo} alt="website logo" className='w-36'></img></NavLink>
      <div className="flex space-x-4">
        <NavLink to="/home" className="hover:text-yellow-300 transition-colors duration-200 flex items-center">
          <Briefcase className="mr-1" size={18} />
          Opportunities
        </NavLink>

        <NavLink to="/find-salaries" className="hover:text-yellow-300 transition-colors duration-200 flex items-center">
          <DollarSign className="mr-1" size={18} />
          Find Salaries
        </NavLink>

        <NavLink to="/welcome-employers" className="hover:text-yellow-300 transition-colors duration-200 flex items-center">
          <Building2 className="mr-1" size={18} />
          Post a Job
        </NavLink>



      { isAdmin && <NavLink to="/admin-dashboard" className="hover:text-yellow-300 transition-colors duration-200 flex items-center">
            AdminDashboard          
          </NavLink>
      }
        
      { isEmployer &&  <NavLink to="/employer-dashboard" className="hover:text-yellow-300 transition-colors duration-200 flex items-center">

            Dashboard          
          </NavLink>
      }

      { isEmployee &&  <NavLink to="/employee/profile" className="hover:text-yellow-300 transition-colors duration-200 flex items-center">

          Profile          
      </NavLink>
      }
      
      {!isAuthenticated &&
        <NavLink to="/signup" className="hover:text-yellow-300 transition-colors duration-200 flex items-center">
          Sign Up
        </NavLink>

      }

      { !isAuthenticated &&
        <NavLink to="/login" className="bg-yellow-500 text-blue-800 px-4 py-2 rounded hover:bg-yellow-400 transition-colors duration-200 flex items-center">
          <LogIn className="mr-1" size={18} />
          Login
        </NavLink>
      }
    
      
      {
        isAuthenticated &&
        <NavLink to="/login" className="bg-yellow-500 text-blue-800 px-4 py-2 rounded hover:bg-yellow-400 transition-colors duration-200 flex items-center" onClick={handleLogout}>

          Log Out
        </NavLink>
      }

      </div>
    </div>
  </nav>

</>
    )
  }

export default Navbar;



