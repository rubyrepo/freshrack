import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import Modal from "react-modal";


Modal.setAppElement("#root");

const MyItems = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      borderRadius: "0.5rem",
      padding: "2rem",
      maxWidth: "500px",
      width: "90%",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  useEffect(() => {
    fetchUserFoods();
  }, [user]);

  const fetchUserFoods = async () => {
    try {
      const response = await fetch(
        `https://freshrackserver.vercel.app/api/foods/user/${user.email}`
      );
      if (!response.ok) throw new Error("Failed to fetch foods");
      const data = await response.json();
      setFoods(data);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedFood = {
        foodTitle: selectedFood.foodTitle,
        foodImage: selectedFood.foodImage,
        category: selectedFood.category,
        quantity: Number(selectedFood.quantity),
        expiryDate: new Date(selectedFood.expiryDate).toISOString(),
        description: selectedFood.description,
      };

      const response = await fetch(
        `https://freshrackserver.vercel.app/api/foods/${selectedFood._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFood),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update food");
      }

      await fetchUserFoods();
      setIsUpdateModalOpen(false);
      setSelectedFood(null);
      Swal.fire("Success", "Food item updated successfully!", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://freshrackserver.vercel.app/api/foods/${selectedFood._id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete food");

      await fetchUserFoods();
      setIsDeleteModalOpen(false);
      Swal.fire("Deleted!", "Food item has been deleted.", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">My Food Items</h2>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Expiry Date</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    <img
                      src={food.foodImage}
                      alt={food.foodTitle}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{food.foodTitle}</td>
                  <td className="py-2 px-4 border-b">{food.category}</td>
                  <td className="py-2 px-4 border-b">{food.quantity}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(food.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      onClick={() => {
                        setSelectedFood(food);
                        setIsUpdateModalOpen(true);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      onClick={() => {
                        setSelectedFood(food);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <Modal
          isOpen={isUpdateModalOpen}
          onRequestClose={() => setIsUpdateModalOpen(false)}
          style={customStyles}
        >
          {selectedFood && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Update Food Item</h3>
              <form className="space-y-4" onSubmit={handleUpdate}>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    Food Title
                  </label>
                  <input
                    type="text"
                    value={selectedFood.foodTitle}
                    onChange={(e) =>
                      setSelectedFood((prev) => ({
                        ...prev,
                        foodTitle: e.target.value,
                      }))
                    }
                    required
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    value={selectedFood.category}
                    onChange={(e) =>
                      setSelectedFood((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    required
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={selectedFood.quantity}
                    onChange={(e) =>
                      setSelectedFood((prev) => ({
                        ...prev,
                        quantity: e.target.value,
                      }))
                    }
                    required
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={selectedFood.expiryDate?.split("T")[0]}
                    onChange={(e) =>
                      setSelectedFood((prev) => ({
                        ...prev,
                        expiryDate: e.target.value,
                      }))
                    }
                    required
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsUpdateModalOpen(false);
                      setSelectedFood(null);
                    }}
                    className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </Modal>

        
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          style={customStyles}
        >
          {selectedFood && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Confirm Delete</h3>
              <p className="mb-6">
                Are you sure you want to delete "{selectedFood.foodTitle}"? This
                action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedFood(null);
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MyItems;
