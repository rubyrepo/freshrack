import React from 'react';
import { 
  Milk, 
  Beef, 
  Carrot, 
  Apple, 
  Wheat, 
  Cookie, 
  Coffee,
  Torus,
  Package
} from 'lucide-react';


const FoodCategories = () => {
  const categories = [
    { name: 'Dairy', icon: Milk },
    { name: 'Meat', icon: Beef },
    { name: 'Vegetables', icon: Carrot },
    { name: 'Fruits', icon: Apple },
    { name: 'Grains', icon: Wheat },
    { name: 'Snacks', icon: Cookie },
    { name: 'Beverages', icon: Coffee },
    { name: 'Condiments', icon: Torus },
    { name: 'Other', icon: Package }
  ];

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Food Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <category.icon className="w-10 h-10 mb-3 text-green-600" />
              <p className="text-sm font-medium text-gray-700">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodCategories;
