# The Big Apple Portal

## Overview

TheThe Big Apple Portal is a full-stack web application that allows Employers to post apprenticeship openings, Employees to apply for apprenticeships, and Admins to manage the system. This project uses the following technologies:

### Built With
| Technology | Description                               | 
|------------|-------------------------------------------|
| Spring Boot       | It is used for backend development with REST APIs.          | 
| Spring Security       | It is used for authentication and authorization                | 
| React.js | It is used for frontend development.| 
|MySQL|Its is used as the database.| 
| Tailwind CSS|It is used for styling.| 
| Maven |Its is used for project management| 
 
## Technologies

- **Backend:**
  - **Spring Boot**: Framework for building RESTful APIs.
  - **Spring Security**: Security framework for authentication and authorization.
  - **MySQL**: Relational database management system.
  
- **Frontend:**
  - **React.js**: JavaScript library for building user interfaces.
  - **Tailwind CSS**: Utility-first CSS framework for styling.

- **Tools:**
  - **Maven**: Project management and build automation tool.
  - **VS Code**: Code editor for frontend development.
  - **IntelliJ IDEA**: IDE for backend development.
  - **MySQL Workbench**: GUI tool for database management.

## Project Structure

### Backend

1. **Controllers**: Handle HTTP requests and responses.
   - `UserController.java`
   - `ApprenticeshipController.java`
   - `ApplicationController.java`

2. **Services**: Contain business logic.
   - `UserService.java`
   - `ApprenticeshipService.java`
   - `ApplicationService.java`
  

3. **Repositories**: Interact with the database.
   - `UserRepository.java`
   - `ApprenticeshipRepository.java`
   - `ApplicationRepository.java`
  
4. **Models**: Define the data structure.
   - `User.java`
   - `Apprenticeship.java`
   - `Application.java`

5. **Configuration**: Setup security and database configurations.
   - `SecurityConfig.java`
   - `CorsConfig.java`

### Frontend

1. **Components Pages**:
   - `LoginForm.jsx`: Component for user login.
   - `ApprenticeshipDisplay.jsx`:Component for searching apprenticeships.
   - `FindSalaries.jsx`: Component for searching salaries range.
 

2. **Routing**: Configures navigation between components.
   - `App.js`: Main application router.


## MVP Features and Deliverables

### **1. Admin Module**

**MVP Features:**
- Admin login.
- View all users(employees and employers).
- Add and delete other admins.
- View all employers and employees.


**Deliverables:**
- Admin dashboard with functionality for managing other admins and users.
- APIs for CRUD operations on admins and users.
- UI components for admin actions.

### **2. Employer Module**

**MVP Features:**
- Employer registration and login.
- Post an apprenticeships with details.
- View, update, and delete posted apprenticeships.
- View applicants for each apprenticeship.

**Deliverables:**
- Employer dashboard for managing apprenticeship postings and applicants.
- APIs for apprenticeship posting, updating and deleting.
- UI components for applicants management and applicant review.

### **3. Employee Module**

**MVP Features:**
- Employee registration and login.
- Update employee profile (email, phone number, summary).
- Search and apply for apprenticeships.
- View applied apprenticeships and their statuses.

**Deliverables:**
- Employee dashboard for profile management.
- APIs for user profile updates, and application submission.
- UI components for apprenticeship search, application process, and profile management.

## Figma
The design and prototy for this project can be found in the following link: [Clickhere](
https://www.figma.com/design/fkTUF3r4S8fUO8nIBZJxGK/TheBigApplePortal?node-id=1-3&t=CYnIifOR9ahQiyJZ-1)