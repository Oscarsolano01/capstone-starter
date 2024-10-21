function Reviews({ reviews }) {
  return (
    <div>
      {reviews?.map((review) => (
        <section key={review.id}>
          {review.review}
          {review.rating}
        </section>
      ))}
    </div>
  );
}
export default Reviews;
