import React, { useState } from "react";
import Businesses from "./Businesses";
function CreateReview({ businesses, auth }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [businessReview, setBusinessReview] = useState(""); // Default to the first business
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.id) {
      setError("You must be logged in to post a review.");
      return;
    }

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          businessname: auth.id,
          businesses,
          rating,
          review,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      setReview("");
      setRating(1);
      alert("Review submitted successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Create a Review</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Business:
          <select
            value={businessReview}
            onChange={(e) => setBusinessReview(e.target.value)}
          >
            {businesses?.map((business) => (
              <option key={business.id} value={business.id}>
                {business.businessname}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Rating:
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
        <br />
        <label>
          Review:
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default CreateReview;
