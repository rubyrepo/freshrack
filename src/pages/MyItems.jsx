import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import Modal from 'react-modal';

// Set modal app element for accessibility
Modal.setAppElement('#root');

const MyItems = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const categories = [
    'Dairy', 'Meat', 'Vegetables', 'Fruits', 'Grains',
    'Snacks', 'Beverages', 'Condiments', 'Other'
  ];

  // Modal styles
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      padding: '2rem',
      maxWidth: '500px',
      width: '90%',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  };

  useEffect(() => {
    fetchUserFoods();
  }, [user]);

  const fetchUserFoods = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/foods/user/${user.email}`);
      if (!response.ok) throw new Error('Failed to fetch foods');
      const data = await response.json();
      setFoods(data);
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/foods/${selectedFood._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedFood),
      });

      if (!response.ok) throw new Error('Failed to update food');

      await fetchUserFoods();
      setIsUpdateModalOpen(false);
      Swal.fire('Success', 'Food item updated successfully!', 'success');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/foods/${selectedFood._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete food');

      await fetchUserFoods();
      setIsDeleteModalOpen(false);
      Swal.fire('Deleted!', 'Food item has been deleted.', 'success');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

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
        <h2 className="text-2xl font-bold mb-6">My Food Items</h2>

        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Expiry Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id}>
                  <td>
                    <img
                      src={food.foodImage}
                      alt={food.foodTitle}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{food.foodTitle}</td>
                  <td>{food.category}</td>
                  <td>{food.quantity}</td>
                  <td>{new Date(food.expiryDate).toLocaleDateString()}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => {
                        setSelectedFood(food);
                        setIsUpdateModalOpen(true);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-error"
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

        {/* Update Modal */}
        <Modal
          isOpen={isUpdateModalOpen}
          onRequestClose={() => setIsUpdateModalOpen(false)}
          style={customStyles}
          contentLabel="Update Food Modal"
        >
          {selectedFood && (
            <>
              <h3 className="text-2xl font-bold mb-4">Update Food Item</h3>
              <form onSubmit={handleUpdate}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Food Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={selectedFood.foodTitle}
                    onChange={(e) => setSelectedFood({
                      ...selectedFood,
                      foodTitle: e.target.value
                    })}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={selectedFood.category}
                    onChange={(e) => setSelectedFood({
                      ...selectedFood,
                      category: e.target.value
                    })}
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Quantity</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    value={selectedFood.quantity}
                    onChange={(e) => setSelectedFood({
                      ...selectedFood,
                      quantity: e.target.value
                    })}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Expiry Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered"
                    value={selectedFood.expiryDate.split('T')[0]}
                    onChange={(e) => setSelectedFood({
                      ...selectedFood,
                      expiryDate: e.target.value
                    })}
                    required
                  />
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      setIsUpdateModalOpen(false);
                      setSelectedFood(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedFood(null);
          }}
          style={customStyles}
          contentLabel="Delete Confirmation Modal"
        >
          {selectedFood && (
            <>
              <h3 className="text-2xl font-bold mb-4">Confirm Delete</h3>
              <p className="mb-6">Are you sure you want to delete "{selectedFood.foodTitle}"? This action cannot be undone.</p>
              <div className="flex justify-end gap-2">
                <button
                  className="btn btn-error"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedFood(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MyItems;