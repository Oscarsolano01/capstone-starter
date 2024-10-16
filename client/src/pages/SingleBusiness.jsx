import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleBusiness() {
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
  console.log("single businesses", business);
  console.log("reviews", reviews);
  return (
    <div>
      <div className="business-card" key={business.id}>
        <h2 className="business-name">Business: {business.busname} </h2>
        <h2>About Us: {business.description} </h2>
        <img src={business.busimage} alt={business.busname} />
      </div>
      <div className="business-reviews"></div>
    </div>
  );
}

export default SingleBusiness;
