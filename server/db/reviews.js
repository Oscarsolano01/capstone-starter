const { client } = require("./client");

const createReviews = async ({ rating, review, userID, businessID }) => {
  try {
    const SQL = `INSERT INTO reviews(rating, review, userID, businessID) VALUES($1, $2, $3, $4) RETURNING *`;
    const {
      rows: [result],
    } = await client.query(SQL, [rating, review, userID, businessID]);
    return result;
  } catch (err) {
    throw err;
  }
};
const fetchReviews = async () => {
  const SQL = `
    SELECT * FROM reviews;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchSingleBusinessReviews = async (id) => {
  const SQL = `
    SELECT 
      reviews.rating, 
      reviews.id, 
      reviews.userid, 
      reviews.review,
      reviews.businessid,
      users.username
    FROM reviews
    JOIN users ON reviews.userid = users.id
    WHERE businessid=$1;`;
  const response = await client.query(SQL, [id]);
  return response.rows;
};

const deleteReview = async (id) => {
  try {
    const SQL = `DELETE FROM reviews WHERE id=$1 RETURNING *`;
    const {
      rows: [result],
    } = await client.query(SQL, [id]);
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  createReviews,
  fetchReviews,
  fetchSingleBusinessReviews,
  deleteReview,
};
