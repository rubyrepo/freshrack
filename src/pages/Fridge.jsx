import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const Fridge = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState(null);

  const categories = [
    'All',
    'Dairy',
    'Meat',
    'Vegetables',
    'Fruits',
    'Grains',
    'Snacks',
    'Beverages',
    'Condiments',
    'Other'
  ];

  useEffect(() => {
    fetchFoods();
  }, [searchTerm, selectedCategory]);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:3000/api/foods';
      const params = new URLSearchParams();

      if (searchTerm) {
        params.append('search', searchTerm);
      }
      if (selectedCategory && selectedCategory !== 'All') {
        params.append('category', selectedCategory);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch foods');
      const data = await response.json();
      setFoods(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      Swal.fire('Error', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Debounce search function
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
  }, 500);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">My Fridge</h2>
          
          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="form-control w-full md:w-64">
              <input
                type="text"
                placeholder="Search foods..."
                className="input input-bordered"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            <select
              className="select select-bordered w-full md:w-48"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <Link to="/add-food" className="btn btn-primary w-full md:w-auto">
            Add New Food
          </Link>
        </div>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods.map((food) => (
            <div key={food._id} className="card bg-base-100 shadow-xl">
              <figure className="px-4 pt-4">
                <img
                  src={food.foodImage}
                  alt={food.foodTitle}
                  className="rounded-xl h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h2 className="card-title">{food.foodTitle}</h2>
                  {new Date(food.expiryDate) < new Date() && (
                    <div className="badge badge-error gap-2">
                      Expired
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="badge badge-outline">{food.category}</span>
                  </div>
                  <p className="text-sm">
                    Quantity: {food.quantity}
                  </p>
                </div>

                <div className="card-actions justify-end mt-4">
                  <Link 
                    to={`/food/${food._id}`} 
                    className="btn btn-primary btn-sm"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {foods.length === 0 && !loading && (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold mb-2">
              No food items found
            </h3>
            <p className="mb-4">Try adjusting your search or filter criteria</p>
            <Link to="/add-food" className="btn btn-primary">
              Add Food Item
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fridge;