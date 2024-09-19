import React from 'react'

const AddNewCategoryForm = () => {
  return (
    <>
 <div className="flex justify-center items-center min-h-screen bg-gray-100">
 <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <form className='w-full'>
            <h2  className="text-2xl font-semibold text-center text-gray-800 mb-6">Add a new Category</h2>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2"> Title:</label>
                    <input  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    type="text" name="title"  required />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">Location:</label>
                    <input  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    type="text" name="location"  required />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">Description:</label>
                    <input  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    type="text" name="description"   required />
                </div>
                
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">Apprenticeship Type:</label>
                    <select name="aprenticeshipType" required>
                        <option value="Employee">Remote</option>
                        <option value="Employer">In person</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">Salary Range:</label>
                    <input  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    type="text" name="salary"  required />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">Status:</label>
                    <input  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    type="text" name="status"   required />
                </div>

                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">Date Posted:</label>
                    <input  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    type="text" name="datePosted"  required />
                </div>

                <button  className="w-full bg-[#023e8a]  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300" type="submit"> Create</button>
        </form>      
    </div>
    </div> 
    </>
  )
}

export default AddNewCategoryForm
