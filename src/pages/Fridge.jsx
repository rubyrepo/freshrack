import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const Fridge = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/foods');
      if (!response.ok) {
        throw new Error('Failed to fetch foods');
      }
      const data = await response.json();
      setFoods(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Fridge</h2>
        </div>

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
                  {isExpired(food.expiryDate) && (
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

        {foods.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold mb-2">
              No food items in your fridge
            </h3>
            <p className="mb-4">Start by adding some food items to your inventory</p>
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