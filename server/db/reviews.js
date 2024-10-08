const { client } = require("./client");

const createReviews = async ({
  businessName,
  category,
  description,
  businessImage,
}) => {
  try {
    const SQL = `INSERT INTO businesses(businessName, category, description, businessImage) VALUES($1, $2, $3, $4) RETURNING *`;
    const {
      rows: [business],
    } = await client.query(SQL, [
      businessName,
      category,
      description,
      businessImage ||
        "https://static.wixstatic.com/media/40bb67_32a45a704190429eb53a3f3cd1336cb8~mv2.jpg/v1/fill/w_528,h_420,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/40bb67_32a45a704190429eb53a3f3cd1336cb8~mv2.jpg",
    ]);
    return business;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createReviews };
