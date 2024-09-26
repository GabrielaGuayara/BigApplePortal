import React, { useEffect, useState } from 'react';
import ApiService from '../../Service/ApiService'; // Adjust the path as needed

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await ApiService.getAllCategories();
        setCategories(data);
      } catch (error) {
        setErrorMessage('Failed to fetch categories: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <h2 className="text-2xl font-semibold mb-4">All Categories</h2>
      <ul className="list-disc pl-5">
        {categories.map((category) => (
          <li key={category.id} className="mb-2">
            {category.name} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;


