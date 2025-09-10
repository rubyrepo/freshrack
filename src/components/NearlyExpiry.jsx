import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { AlertCircle } from 'lucide-react';

const NearlyExpiry = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNearlyExpiryFoods();
  }, []);

  const fetchNearlyExpiryFoods = async () => {
    try {
      const response = await fetch('https://freshrackserver.vercel.app/api/foods/nearly-expired');
      if (!response.ok) throw new Error('Failed to fetch foods');
      const data = await response.json();
      setFoods(data);
    } catch (error) {
      console.error('Error fetching nearly expiry foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Nearly Expiring Items
        </h2>

        {foods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map((food) => {
              const daysLeft = calculateDaysLeft(food.expiryDate);

              const badgeClass =
                daysLeft <= 1
                  ? 'badge-error'
                  : daysLeft <= 3
                  ? 'badge-warning'
                  : 'badge-info';

              const badgeText =
                daysLeft === 0
                  ? 'Expires today'
                  : daysLeft === 1
                  ? 'Expires tomorrow'
                  : `${daysLeft} days left`;

              return (
                <div
                  key={food._id}
                  className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden"
                >
                  <figure className="relative h-52 md:h-64 w-full">
                    <img
                      src={food.foodImage}
                      alt={food.foodTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`badge ${badgeClass} px-3 py-1 text-sm`}>
                        {badgeText}
                      </span>
                    </div>
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-lg md:text-xl font-semibold mb-2 flex items-center gap-2">
                      {food.foodTitle}
                      <AlertCircle className="w-5 h-5 text-warning" />
                    </h3>

                    <div className="space-y-1 text-sm text-gray-700">
                      <p>
                        <span className="font-semibold">Category:</span> {food.category}
                      </p>
                      <p>
                        <span className="font-semibold">Quantity:</span> {food.quantity}
                      </p>
                      <p>
                        <span className="font-semibold">Expiry Date:</span>{' '}
                        {new Date(food.expiryDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="card-actions justify-end mt-4">
                      <Link
                        to={`/food/${food._id}`}
                        className="btn btn-primary btn-sm transition-transform transform hover:scale-105"
                      >
                        See Details
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
            <h3 className="text-2xl font-semibold mb-2">No items are nearly expiring</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              All your food items are safely within their expiry dates. Great job keeping your
              fridge fresh!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearlyExpiry;
