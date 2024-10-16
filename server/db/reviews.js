const { client } = require("./client");

const createReviews = async ({
  busName,
  rating,
  review,
  userID,
  businessID,
}) => {
  try {
    const SQL = `INSERT INTO reviews(rating, review, userID, businessID, busName) VALUES($1, $2, $3, $4) RETURNING *`;
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
  const SQL = `SELECT * FROM reviews WHERE businessID=$1;`;
  const response = await client.query(SQL, [id]);
  return response.rows;
};
module.exports = { createReviews, fetchReviews, fetchSingleBusinessReviews };
