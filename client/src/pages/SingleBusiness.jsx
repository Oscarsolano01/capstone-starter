import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Rating from "@mui/material/Rating";

function SingleBusiness(users) {
  const [business, setBusiness] = useState({});
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);

  let { id } = useParams();
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const businessResponse = await fetch(
          `http://localhost:3000/api/businesses/${id}`
        );
        const reviewsResponse = await fetch(
          `http://localhost:3000/api/reviews/business/${id}`
        );
        if (!businessResponse.ok) {
          throw new Error("Failed to fetch business");
        }
        const businessData = await businessResponse.json();
        const reviewData = await reviewsResponse.json();
        console.log(reviewData);
        console.log(businessData);
        setReviews(reviewData);
        setBusiness(businessData[0]);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBusiness();
  }, []);
  const handleDelete = async (reviewId) => {
    try {
      await fetch(`http://localhost:3000/api/reviews/${reviewId}`, {
        method: "DELETE",
      });
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="signle-business-card" key={business.id}>
        <h2 className="business-name">{business.busname} </h2>
        <img src={business.busimage} alt={business.busname} />
        <h2>About Us: {business.description} </h2>
      </div>
      {reviews?.map(function (review) {
        return (
          <div className="review-card" key={review.id}>
            <div className="reviews">
              <h2 className="rating">
                <Rating name="read-only" value={review.rating} readOnly />
                Created by: {review.username}
              </h2>
            </div>
            <h2>
              Review: {review.review} {"  "}
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(review.id)}
              >
                Delete Review
              </Button>
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default SingleBusiness;
