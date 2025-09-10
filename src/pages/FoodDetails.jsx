import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchFoodDetails();
    fetchNotes();
  }, [id]);

  const fetchFoodDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/foods/${id}`);
      if (!response.ok) throw new Error("Food not found");
      const data = await response.json();
      setFood(data);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/foods/${id}/notes`
      );
      if (!response.ok) throw new Error("Failed to fetch notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/foods/${id}/notes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: note,
            userEmail: user.email,
            postedDate: new Date().toISOString(),
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to add note");

      await fetchNotes();
      setNote("");
      Swal.fire("Success", "Note added successfully!", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const calculateExpiryCountdown = () => {
    if (!food) return "";
    const now = new Date();
    const expiryDate = new Date(food.expiryDate);
    const diffTime = expiryDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Expires today";
    if (diffDays <= 3) return `Expires in ${diffDays} days`;
    return `${diffDays} days until expiry`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Food item not found
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
        {/* Food Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <img
            src={food.foodImage}
            alt={food.foodTitle}
            className="rounded-xl w-full h-64 object-cover"
          />
          <div className="flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-800">
                {food.foodTitle}
              </h2>
              <p>
                <span className="font-semibold">Category:</span> {food.category}
              </p>
              <p>
                <span className="font-semibold">Quantity:</span> {food.quantity}
              </p>
              <p>
                <span className="font-semibold">Added by:</span> {food.userEmail}
              </p>
              <p>
                <span className="font-semibold">Added on:</span>{" "}
                {new Date(food.addedDate).toLocaleDateString()}
              </p>
              <p
                className={`px-2 py-1 rounded text-sm font-medium ${
                  calculateExpiryCountdown() === "Expired"
                    ? "bg-red-500 text-white"
                    : calculateExpiryCountdown().includes("Expires in")
                    ? "bg-orange-400 text-white"
                    : "bg-blue-200 text-gray-800"
                }`}
              >
                {calculateExpiryCountdown()}
              </p>
              {food.description && <p className="mt-2 text-gray-700">{food.description}</p>}
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="border-t border-gray-200 p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Notes</h3>

          {/* Add Note Form */}
          <form onSubmit={handleAddNote} className="mb-6">
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows="4"
              placeholder="Add a note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={user?.email !== food.userEmail}
            />
            <div className="mt-2 flex items-center gap-4">
              <button
                type="submit"
                disabled={user?.email !== food.userEmail || !note.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                Add Note
              </button>
              {user?.email !== food.userEmail && (
                <p className="text-sm text-red-500">
                  Only the owner can add notes to this item
                </p>
              )}
            </div>
          </form>

          {/* Notes List */}
          <div className="space-y-4">
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <p className="text-gray-800">{note.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Posted on: {new Date(note.postedDate).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No notes added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
