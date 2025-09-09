import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchFoodDetails();
    fetchNotes();
  }, [id]);

  const fetchFoodDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/foods/${id}`);
      if (!response.ok) throw new Error('Food not found');
      const data = await response.json();
      setFood(data);
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/foods/${id}/notes`);
      if (!response.ok) throw new Error('Failed to fetch notes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/foods/${id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: note,
          userEmail: user.email,
          postedDate: new Date().toISOString()
        }),
      });

      if (!response.ok) throw new Error('Failed to add note');
      
      await fetchNotes();
      setNote('');
      Swal.fire('Success', 'Note added successfully!', 'success');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  const calculateExpiryCountdown = () => {
    if (!food) return '';
    
    const now = new Date();
    const expiryDate = new Date(food.expiryDate);
    const diffTime = expiryDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Expires today';
    return `${diffDays} days until expiry`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error">Food item not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Food Image */}
              <div>
                <img
                  src={food.foodImage}
                  alt={food.foodTitle}
                  className="rounded-xl w-full h-[300px] object-cover"
                />
              </div>

              {/* Food Details */}
              <div>
                <h2 className="card-title text-2xl mb-4">{food.foodTitle}</h2>
                <div className="space-y-3">
                  <p><span className="font-semibold">Category:</span> {food.category}</p>
                  <p><span className="font-semibold">Quantity:</span> {food.quantity}</p>
                  <p><span className="font-semibold">Added by:</span> {food.userEmail}</p>
                  <p><span className="font-semibold">Added on:</span> {new Date(food.addedDate).toLocaleDateString()}</p>
                  <div className={`alert ${calculateExpiryCountdown() === 'Expired' ? 'alert-error' : 'alert-info'}`}>
                    <span>{calculateExpiryCountdown()}</span>
                  </div>
                  <p className="mt-4">{food.description}</p>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="divider">Notes</div>
            
            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="mb-6">
              <div className="form-control">
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Add a note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  disabled={user?.email !== food.userEmail}
                ></textarea>
              </div>
              <div className="mt-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={user?.email !== food.userEmail || !note.trim()}
                >
                  Add Note
                </button>
                {user?.email !== food.userEmail && (
                  <p className="text-sm text-error mt-2">
                    Only the owner can add notes to this item
                  </p>
                )}
              </div>
            </form>

            {/* Notes List */}
            <div className="space-y-4">
              {notes.map((note, index) => (
                <div key={index} className="card bg-base-200">
                  <div className="card-body">
                    <p>{note.text}</p>
                    <div className="text-sm text-base-content/70">
                      Posted on: {new Date(note.postedDate).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;