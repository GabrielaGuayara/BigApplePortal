# The Big Apple Portal

## Overview

TheThe Big Apple Portal is a full-stack web application that allows Employers to post job openings, Employees to apply for jobs, and Admins to manage the system. This project uses the following technologies:

### Built With
| Technology | Description                               | 
|------------|-------------------------------------------|
| Spring Boot       | for backend development with REST APIs.          | 
| Spring Security       |  for authentication and authorization                | 
| React.js | for frontend development.| 
|MySQL| as the database.| 
| Tailwind CSS| for styling.| 
| Maven | for project management| 
 
- **Spring Boot** for backend development with REST APIs
- **Spring Security** for authentication and authorization
- **React.js** for frontend development
- **MySQL** as the database
- **Tailwind CSS** for styling
- **Maven** for project management

## Technologies

- **Backend:**
  - **Spring Boot 3**: Framework for building RESTful APIs.
  - **Spring Security 6**: Security framework for authentication and authorization.
  - **MySQL**: Relational database management system.
  
- **Frontend:**
  - **React.js**: JavaScript library for building user interfaces.
  - **Tailwind CSS**: Utility-first CSS framework for styling.

- **Tools:**
  - **Maven**: Project management and build automation tool.
  - **VS Code**: Code editor for frontend development.
  - **STS (Spring Tool Suite)** or **IntelliJ IDEA**: IDE for backend development.
  - **MySQL Workbench**: GUI tool for database management.

## Project Structure

### Backend

1. **Controllers**: Handle HTTP requests and responses.
   - `UserController.java`
   - `JobController.java`
   - `ApplicationController.java`
   - `JobCategoryController.java`

2. **Services**: Contain business logic.
   - `UserService.java`
   - `JobService.java`
   - `ApplicationService.java`
   - `JobCategoryService.java`

3. **Repositories**: Interact with the database.
   - `UserRepository.java`
   - `JobRepository.java`
   - `ApplicationRepository.java`
   - `JobCategoryRepository.java`

4. **Models**: Define the data structure.
   - `User.java`
   - `Job.java`
   - `Application.java`
   - `JobCategory.java`

5. **Configuration**: Setup security and database configurations.
   - `SecurityConfig.java`
   - `DatabaseConfig.java`

### Frontend

1. **Components**:
   - `LoginForm.js`: Component for user login.
   - `JobPosting.js`: Component for posting jobs.
   - `JobSearch.js`: Component for searching jobs.
   - `ApplicationStatus.js`: Component for viewing application status.

2. **Routing**: Configures navigation between components.
   - `App.js`: Main application router.

3. **Axios Configuration**:
   - `axios.js`: Configures Axios for API requests.

## MVP Features and Deliverables

### **1. Admin Module**

**MVP Features:**
- Admin login.
- View all job categories.
- Add, update, and delete job categories.
- View all jobs posted.
- View all employers and employees.
- View all job applications.

**Deliverables:**
- Admin dashboard with functionality for managing job categories and users.
- APIs for CRUD operations on job categories, users, and job applications.
- UI components for admin actions.

### **2. Employer Module**

**MVP Features:**
- Employer registration and login.
- Post a job with details.
- View, update, and delete posted jobs.
- View applicants for each job.
- Update job application status.

**Deliverables:**
- Employer dashboard for managing job postings and applicants.
- APIs for job posting, updating, deleting, and application status management.
- UI components for job management and applicant review.

### **3. Employee Module**

**MVP Features:**
- Employee registration and login.
- Update employee profile (education, work experience, skills).
- Search and apply for jobs.
- View applied jobs and their statuses.

**Deliverables:**
- Employee dashboard for profile management and job applications.
- APIs for user profile updates, job search, and application submission.
- UI components for job search, application process, and profile management.
