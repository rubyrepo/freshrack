import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const AddFood = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const categories = [
    "Dairy",
    "Meat",
    "Vegetables",
    "Fruits",
    "Grains",
    "Snacks",
    "Beverages",
    "Condiments",
    "Other",
  ];

  const [formData, setFormData] = useState({
    foodImage: "",
    foodTitle: "",
    category: "",
    quantity: 1,
    expiryDate: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

      const response = await fetch("https://freshrackserver.vercel.app/api/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodData),
      });

      if (!response.ok) throw new Error("Failed to add food item");

      Swal.fire({
        icon: "success",
        title: "Food item added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/my-items");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Oops...", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Add New Food Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                Food Image URL
              </label>
              <input
                type="url"
                name="foodImage"
                placeholder="Enter image URL"
                value={formData.foodImage}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                Food Title
              </label>
              <input
                type="text"
                name="foodTitle"
                placeholder="Enter food title"
                value={formData.foodTitle}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>


            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter food description"
              rows="4"
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            ></textarea>
          </div>

          
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
              ) : (
                "Add Food Item"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
