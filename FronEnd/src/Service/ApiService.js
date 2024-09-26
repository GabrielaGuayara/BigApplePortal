export default class ApiService {
    static BASE_URL = "http://localhost:8080";

    static getHeader() {
        const token = localStorage.getItem("token");
        // const userId = localStorage.getItem("id")
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"  // Ensure the content type is JSON
        };
    }

    /** AUTH */

    // This registers a new user
    static async registerUser(registration) {
        try {
            console.log('Registration Data:', registration); // Log the data being sent
    
    
            const response = await fetch(`${this.BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registration),
            });
    
    
            if (!response.ok) {
                const errorData = await response.json(); // Get the error details from the response
                throw new Error(errorData.message || 'Failed to register');
            }
    
            const data =  await response.json()
            return data;
        } catch (error) {
            console.error('Error during registration:', error); // Log the error
            throw new Error(error.message);
        }
    }
    
    // This logs in a registered user
    static async loginUser(loginDetails) {
        const response = await fetch(`${this.BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(loginDetails) 
        });
        
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        
        const data = await response.json(); 
        return data;
    }

        // This registers a new user
        static async registerAdmin(adminDetails) {
            try {console.log('Registration Data:', adminDetails); // Log the data being sent
        
                const response = await fetch(`${this.BASE_URL}/users/add-admin`, {
                    method: 'POST',
                    headers: this.getHeader(),
                    body: JSON.stringify(adminDetails),
                });
        
                if (!response.ok) {
                    const errorData = await response.json(); 
                    throw new Error(errorData.message || 'Failed to register');
                }
        
                const data =  await response.json()
                return data;

            } catch (error) {
                console.error('Error during registration:', error); // Log the error
                throw new Error(error.message);
            }
        }
    

    /** USERS */

    // This gets all users
    static async getAllUsers() {
        const response = await fetch(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json(); 
        console.log(data)
        return data;
    }

    // This gets a user profile
    static async getUserProfile() {
        const response = await fetch(`${this.BASE_URL}/users/get-profile-info`, {
            headers: this.getHeader()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const data = await response.json(); // Parse the JSON response
        return data;
    }

    // This gets a single user
    static async getUser(userId) {
        const response = await fetch(`${this.BASE_URL}/users/get-by-id/${userId}`, {
            headers: this.getHeader()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }

        const data = await response.json();
    }



    static async updateUserProfile(userId, details) {
        console.log(details);
        try {
            const response = await fetch(`${this.BASE_URL}/users/update/${userId}`, {
                method: 'PUT',
                headers: this.getHeader(),
                body: JSON.stringify(details),
            });
    
            // Check if response is not OK (e.g., status 4xx or 5xx)
            if (!response.ok) {
                const errorText = await response.text(); // Get the error message from response
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
    
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error; // Re-throw the error or handle it as needed
        }
    }
    
    
    

    // This deletes a user
    static async deleteUser(userId) {
        const response = await fetch(`${this.BASE_URL}/users/delete/${userId}`, {
            method: 'DELETE',
            headers: this.getHeader()
        });

        if (!response.ok) {
            throw new Error('Failed to delete user');
        }

        const data = await response.json(); // Parse the JSON response
        return data;
    }

    //APPRENTICESHIP
  
    //VIEW ALL USERS(EMPLOYEES AND EMPLOYERS)
    // Method to get all users
    static async getAllUsers() {
        const response = await fetch(`${this.BASE_URL}/users/all`, {
            method: 'GET',
            headers: this.getHeader(),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        return data;
    }


    
    


    /**APPRENTICESHIP CRUD METHODS*/


     // This gets all apprenticeships from the database
     static async getAllApprenticeships() {
        const response = await fetch(`${this.BASE_URL}/auth/all-apprenticeships`);
        const data = await response.json(); 
        return data;
    }

    // This gets an apprenticeship by ID
    static async getApprenticeshipById(apprenticeshipId) {
        const result = await fetch(`${this.BASE_URL}/apprenticeships/get-by-id/${apprenticeshipId}`, {
            headers: this.getHeader()
        });

        if (!result.ok) {
            throw new Error('Failed to fetch apprenticeship');
        }

        const data = await result.json(); 
        return data;
    }


   


    //Get all apprenticeships for a specific user 
   
    static async addApprenticeship(userId, apprenticeshipData) {
        console.log(userId);
        const response = await fetch(`${this.BASE_URL}/apprenticeships/post-apprenticeship/${userId}`, {
            method: 'POST',
            headers: {
                ...this.getHeader(), // Ensure your headers include Content-Type for JSON
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(apprenticeshipData), // Send the apprenticeship data
        });
    
        if (!response.ok) {
            throw new Error('Failed to create apprenticeship');
        }
    
        return await response.json();
    }
    static async getAllApprenticeshipsByUser(userId)
     { const response = await fetch(`${this.BASE_URL}/apprenticeships/${userId}/all`, { method: 'GET', headers: this.getHeader(), });
      if (!response.ok) { throw new Error('Failed to fetch apprenticeships'); }
      
      return await response.json(); 
    }

    
    
    
    static async updateApprenticeship(apprenticeshipId, apprenticeshipData) {
        const userId = localStorage.getItem('id'); // Get userId from local storage
        const response = await fetch(`${this.BASE_URL}/apprenticeships/update-by-id/${userId}/${apprenticeshipId}`, {
            method: 'PUT',
            headers: {
                ...this.getHeader(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apprenticeshipData),
        });
        if (!response.ok) {
            throw new Error('Failed to update apprenticeship');
        }
        return await response.json();
    }
    
    static async deleteApprenticeship(apprenticeshipId) {
        const userId = localStorage.getItem('id'); // Get userId from local storage
        const response = await fetch(`${this.BASE_URL}/apprenticeships/delete/${apprenticeshipId}/${userId}`, {
            method: 'DELETE',
            headers: {
                ...this.getHeader(), // Ensure your headers include Content-Type for JSON
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete apprenticeship');
        }
        return await response.json();
    }
    
    



    // New method to get applications by user ID

    // APPLICATION METHODS


        static async applyForApprenticeship(userId, apprenticeshipId) {
            const response = await fetch(`http://localhost:8080/applications/apply/${userId}/${apprenticeshipId}`, {
                method: 'POST',
                headers: this.getHeader(),
            });
    
            return response;
        }

    


    static async getApplicationsByUserId(userId) {
        const response = await fetch(`${this.BASE_URL}/applications/user/${userId}`, {
            headers: this.getHeader(),
        });


        if (!response.ok) {
            throw new Error('Failed to fetch applications');
        }


        const applications = await response.json();
        return applications;
    }




    /** AUTHENTICATION CHECKER */
    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    static isAdmin() {
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }

    static isEmployee() {
        const role = localStorage.getItem('role');
        return role === 'EMPLOYEE';
    }

    static isEmployer() {
        const role = localStorage.getItem('role');
        return role === 'EMPLOYER';
    }
}


