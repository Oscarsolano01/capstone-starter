const { client } = require("./client");

const { createUser, fetchUsers, createBusiness } = require("./index.js");

const dropTables = async () => {
  try {
    await client.query(`DROP TABLE IF EXISTS users CASCADE`);
    await client.query(`DROP TABLE IF EXISTS businesses CASCADE`);
    await client.query(`DROP TABLE IF EXISTS ratings CASCADE`);
  } catch (err) {
    console.log(err);
  }
};

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS users;
    CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;
  await client.query(SQL);

  await client.query(`
    CREATE TABLE businesses(
    id SERIAL PRIMARY KEY,
    businessName VARCHAR(64) UNIQUE NOT NULL,
    category VARCHAR(64) NOT NULL,
    description VARCHAR(1023) NOT NULL,
    businessImage VARCHAR(255) DEFAULT 
      'https://static.wixstatic.com/media/40bb67_32a45a704190429eb53a3f3cd1336cb8~mv2.jpg/v1/fill/w_528,h_420,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/40bb67_32a45a704190429eb53a3f3cd1336cb8~mv2.jpg'
  )`);

  await client.query;
};

const init = async () => {
  await client.connect();
  console.log("connected to database");

  await dropTables();
  console.log("tables dropped");
  await createTables();
  console.log("tables created");

  const [moe, lucy, ethyl, curly] = await Promise.all([
    createUser({ username: "moe", password: "m_pw" }),
    createUser({ username: "lucy", password: "l_pw" }),
    createUser({ username: "ethyl", password: "e_pw" }),
    createUser({ username: "curly", password: "c_pw" }),
  ]);

  const [
    theGreenSpoon,
    BytyeItSolutions,
    urbanBlossomFloralStudio,
    fitFusion,
    PawsandPlayPetResort,
  ] = await Promise.all([
    createBusiness({
      businessName: "The Green Spoon",
      category: "Restaurant",
      description:
        "A farm-to-table restaurant specializing in organic, locally sourced ingredients. The Green Spoon offers a seasonal menu featuring fresh salads, gourmet sandwiches, and vegetarian options, all crafted with sustainability in mind.",
      busniessImage: "",
    }),

    createBusiness({
      businessName: "Byte IT Solutions",
      category: "Technology Services",
      description:
        "ByteBusters IT Solutions provides comprehensive tech support for small and medium-sized businesses. From troubleshooting hardware to developing custom software solutions, ByteBusters ensures smooth and efficient operations for its clients.",
      busniessImage: "",
    }),

    createBusiness({
      businessName: "Urban Blossom Floral Studio",
      category: "Florist",
      description:
        "Urban Blossom is a contemporary floral studio offering beautiful, hand-crafted arrangements for weddings, corporate events, and everyday occasions. With a focus on unique designs and fresh flowers, their creations are both artistic and elegant.",
      busniessImage: "",
    }),
    createBusiness({
      businessName: "FitFusion",
      category: "Fitness Studio",
      description:
        "FitFusion offers a variety of fitness classes, including yoga, pilates, HIIT, and dance fitness. With experienced instructors and a focus on personalized training, FitFusion helps clients achieve their health goals in a fun and supportive environment.",
      busniessImage: "",
    }),
    createBusiness({
      businessName: "Paws & Play Pet Resort",
      category: "Pet Services",
      description:
        "Paws & Play is a luxury pet boarding and daycare facility offering premium care for dogs and cats. With spacious play areas, grooming services, and individualized attention, pets are treated to a vacation of their own while their owners are away.",
      busniessImage: "",
    }),
  ]);

  console.log(await fetchUsers());
  client.end();
};

init();
