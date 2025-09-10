import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { AlertCircle } from 'lucide-react';

const Expired = () => {
  const [expiredFoods, setExpiredFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpiredFoods();
  }, []);

  const fetchExpiredFoods = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/foods/expired');
      if (!response.ok) throw new Error('Failed to fetch expired foods');
      const data = await response.json();
      setExpiredFoods(data);
    } catch (error) {
      console.error('Error fetching expired foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysExpired = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = today - expiry;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-red-600">
            Expired Items
          </h2>
        </div>

        {expiredFoods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {expiredFoods.map((food) => {
              const daysExpired = getDaysExpired(food.expiryDate);

              return (
                <div
                  key={food._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative h-52 md:h-64 w-full">
                    <img
                      src={food.foodImage}
                      alt={food.foodTitle}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 text-sm rounded-lg font-semibold shadow">
                      Expired {daysExpired} {daysExpired === 1 ? 'day' : 'days'} ago
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between h-[200px]">
                    <h3 className="text-lg md:text-xl font-semibold mb-2 flex items-center gap-2">
                      {food.foodTitle} <AlertCircle className="w-5 h-5 text-red-500" />
                    </h3>

                    <div className="space-y-1 text-gray-700 text-sm">
                      <p>
                        <span className="font-semibold">Category:</span> {food.category}
                      </p>
                      <p>
                        <span className="font-semibold">Quantity:</span> {food.quantity}
                      </p>
                      <p>
                        <span className="font-semibold">Expired on:</span>{' '}
                        {new Date(food.expiryDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Link
                        to={`/food/${food._id}`}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-transform transform hover:scale-105"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-semibold mb-2">No expired items found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Great job keeping track of your food items! Nothing has expired yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expired;
