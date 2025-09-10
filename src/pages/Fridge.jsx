import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Fridge = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState(null);

  const categories = [
    "All",
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

  useEffect(() => {
    fetchFoods();
  }, [searchTerm, selectedCategory]);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      let url = "http://localhost:3000/api/foods";
      const params = new URLSearchParams();

      if (searchTerm) params.append("search", searchTerm);
      if (selectedCategory && selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch foods");

      const data = await response.json();
      setFoods(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };
  const handleSearch = debounce((value) => setSearchTerm(value), 500);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Top controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">My Fridge</h2>

          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search foods..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={food.foodImage}
                alt={food.foodTitle}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {food.foodTitle}
                  </h3>
                  {new Date(food.expiryDate) < new Date() && (
                    <span className="text-xs font-medium text-white bg-red-500 px-2 py-1 rounded">
                      Expired
                    </span>
                  )}
                </div>

                <div className="mt-2 space-y-1">
                  <span className="inline-block text-xs px-2 py-1 bg-gray-100 rounded text-gray-700">
                    {food.category}
                  </span>
                  <p className="text-sm text-gray-600">
                    Quantity: {food.quantity}
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <Link
                    to={`/food/${food._id}`}
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {foods.length === 0 && !loading && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No food items found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fridge;
