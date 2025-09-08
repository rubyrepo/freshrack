import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const AddFood = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const categories = [
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

  const [formData, setFormData] = useState({
    foodImage: '',
    foodTitle: '',
    category: '',
    quantity: 1,
    expiryDate: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const foodData = {
        ...formData,
        addedDate: new Date().toISOString(),
        userEmail: user.email,
      };

      const response = await fetch('http://localhost:3000/api/foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
      });

      if (!response.ok) {
        throw new Error('Failed to add food item');
      }

      Swal.fire({
        icon: 'success',
        title: 'Food item added successfully!',
        showConfirmButton: false,
        timer: 1500
      });

      navigate('/my-items');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="max-w-2xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Add New Food Item</h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Food Image URL */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Food Image URL</span>
                  </label>
                  <input
                    type="url"
                    name="foodImage"
                    placeholder="Enter image URL"
                    className="input input-bordered"
                    value={formData.foodImage}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Food Title */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Food Title</span>
                  </label>
                  <input
                    type="text"
                    name="foodTitle"
                    placeholder="Enter food title"
                    className="input input-bordered"
                    value={formData.foodTitle}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Category */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select
                    name="category"
                    className="select select-bordered"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Quantity</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    className="input input-bordered"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Expiry Date */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Expiry Date</span>
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    className="input input-bordered"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered h-24"
                  placeholder="Enter food description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    'Add Food Item'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;