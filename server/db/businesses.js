const { client } = require("./client");

const createBusiness = async ({ busName, category, description, busImage }) => {
  try {
    const SQL = `INSERT INTO businesses(busName, category, description, busImage) VALUES($1, $2, $3, $4) RETURNING *`;
    const {
      rows: [business],
    } = await client.query(SQL, [
      busName,
      category,
      description,
      busImage ||
        "https://static.wixstatic.com/media/40bb67_32a45a704190429eb53a3f3cd1336cb8~mv2.jpg/v1/fill/w_528,h_420,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/40bb67_32a45a704190429eb53a3f3cd1336cb8~mv2.jpg",
    ]);
    return business;
  } catch (err) {
    console.log(err);
  }
};

const fetchBusinesses = async () => {
  const SQL = `
 SELECT * FROM businesses;
 `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchSingleBusiness = async (id) => {
  const SQL = `SELECT * FROM businesses WHERE id=$1;`;
  const response = await client.query(SQL, [id]);
  return response.rows;
};
module.exports = { createBusiness, fetchBusinesses, fetchSingleBusiness };
