const { client } = require("./client");

const { createUser, fetchUsers, createBusiness } = require("./index.js");
const businesses = [
  {
    busName: "Sustainable Spaces",
    category: "Miscellaneous Services",
    description:
      "An interior design firm focused on creating eco-friendly living spaces using sustainable materials and energy-efficient solutions.",
    busImage:
      "https://cosyinternational.com/wp-content/uploads/2023/08/quanto-costa-un-interior-designer-how-much-does-an-interior-designer-cost.jpg",
  },
  {
    busName: "PetPals Grooming & Boarding",
    category: "Miscellaneous Services",
    description:
      "A full-service pet care business offering grooming, boarding, and daycare for pets, with a focus on comfort and high-quality service for furry friends.",
    busImage:
      "https://upload.wikimedia.org/wikipedia/commons/c/c9/Dog_grooming.JPG",
  },
  {
    busName: "Eventopia Planners",
    category: "Miscellaneous Services",
    description:
      "A creative event planning company that specializes in organizing memorable weddings, corporate events, and parties, with a flair for unique and personalized experiences.",
    busImage:
      "https://images.pexels.com/photos/811572/pexels-photo-811572.jpeg",
  },
  {
    busName: "Crafted Creations Studio",
    category: "Miscellaneous Services",
    description:
      "A community art studio offering workshops and classes in painting, pottery, and crafting, catering to both beginners and experienced artists looking to explore their creativity.",
    busImage:
      "https://images.pexels.com/photos/4241344/pexels-photo-4241344.jpeg",
  },
  {
    busName: "PureAir HVAC Solutions",
    category: "Miscellaneous Services",
    description:
      "A company specializing in eco-friendly HVAC systems, offering installation and maintenance services for energy-efficient heating, ventilation, and air conditioning units.",
    busImage: "https://www.quitcarbon.com/hubfs/AC%20Fan.jpg",
  },
  {
    busName: "Savory Greens Bistro",
    category: "Dining",
    description:
      "A plant-based dining experience offering locally sourced ingredients and innovative vegan dishes, catering to health-conscious and environmentally mindful consumers.",
    busImage:
      "https://i1.pickpik.com/photos/998/400/33/vegetables-spices-preview.jpg",
  },
  {
    busName: "Bread & Butter Bakery",
    category: "Dining",
    description:
      "A charming artisan bakery specializing in freshly baked sourdough, croissants, and pastries, all made with organic flour and seasonal fillings.",
    busImage:
      "https://upload.wikimedia.org/wikipedia/commons/6/65/Bread_and_butter-_Guido_%5E_Angelina_restaurant_-_panoramio.jpg",
  },
  {
    busName: "Global Grains Market",
    category: "Dining",
    description:
      "Specialty store focusing on exotic grains, spices, and foods from around the world, appealing to adventurous cooks and health-conscious shoppers.",
    busImage:
      "https://upload.wikimedia.org/wikipedia/commons/b/ba/Rice_grains_%28IRRI%29.jpg",
  },
  {
    busName: "Flavor Fusion Food Trucks",
    category: "Dining",
    description:
      "A fleet of food trucks serving fusion cuisine, combining flavors from different cultures to create unique and bold dishes for foodies on the go.",
    busImage:
      "https://upload.wikimedia.org/wikipedia/commons/d/d1/Taco_Truck_St_Louis_MO.jpg",
  },
  {
    busName: "Brew & Bite Café",
    category: "Dining",
    description:
      "Cozy coffee shop offering gourmet coffee blends, artisanal teas, and a menu of fresh, healthy breakfast and lunch options.",
    busImage:
      "https://freerangestock.com/sample/131534/menu-board-and-counter-with-blur-view-of-man-in-coffee-shop.jpg",
  },
  {
    busName: "SmartHub Solutions",
    category: "Electronics",
    description:
      "Tech company specializing in smart home automation devices, including lighting, security systems, and appliances, all controlled through a single app.",
    busImage:
      "https://upload.wikimedia.org/wikipedia/commons/5/5a/20._Station_der_Zukunftsenergientour-_Energieeffizienz-Projekte_SmartHome_in_Paderborn_%2812100915513%29.jpg",
  },
  {
    busName: "EcoTech Innovations",
    category: "Electronics",
    description:
      "A startup focused on creating eco-friendly electronic products, such as solar-powered gadgets and energy-efficient appliances, aimed at reducing carbon footprints.",
    busImage:
      "https://www.freeimageslive.co.uk/files/images008/low_energy_bulbs.jpg",
  },
  {
    busName: "Gizmo Garage",
    category: "Electronics",
    description:
      "Retail store offering the latest gadgets, accessories, and cutting-edge tech for tech enthusiasts and professionals alike.",
    busImage:
      "https://freerangestock.com/sample/179127/interior-of-a-high-tech-industrial-chamber-with-complex-equipment..jpg",
  },
  {
    busName: "FutureSound Audio",
    category: "Electronics",
    description:
      "High-end audio equipment manufacturer offering custom-built speakers, headphones, and sound systems for audiophiles and music professionals.",
    busImage:
      "https://images.pexels.com/photos/2988289/pexels-photo-2988289.jpeg",
  },
  {
    busName: "RepairIt Tech Services",
    category: "Electronics",
    description:
      "Mobile electronics repair service specializing in fixing smartphones, tablets, laptops, and other gadgets on-site, saving time for busy customers.",
    busImage:
      "https://images.pexels.com/photos/7639370/pexels-photo-7639370.jpeg",
  },
  {
    busName: "GreenMiles Auto",
    category: "Automotive",
    description:
      "A dealership and service center specializing in electric vehicles, with a focus on promoting sustainable and eco-friendly transportation options.",
    busImage:
      "https://upload.wikimedia.org/wikipedia/commons/7/7f/NewOne_-_Yellow_VinFast_VF_3_at_Green_Future_Show_008.jpg",
  },
  {
    busName: "DetailPro Auto Spa",
    category: "Automotive",
    description:
      "Premium automotive detailing service offering mobile cleaning, waxing, and polishing for high-end vehicles, ensuring a showroom-quality shine.",
    busImage:
      "https://upload.wikimedia.org/wikipedia/commons/f/fb/McLaren_MP4-12C_-_detail.jpg",
  },
  {
    busName: "AutoTech Diagnostics",
    category: "Automotive",
    description:
      "Cutting-edge auto repair shop using advanced diagnostic technology to quickly and accurately fix issues in modern cars, including electric and hybrid vehicles.",
    busImage:
      "https://images.pexels.com/photos/4116224/pexels-photo-4116224.jpeg",
  },
  {
    busName: "RentEco Rides",
    category: "Automotive",
    description:
      "A rental car service offering electric and hybrid vehicles, providing eco-conscious travelers with sustainable transportation options.",
    busImage:
      "https://upload.wikimedia.org/wikipedia/commons/b/b0/Cute_Rental_Car_%284349408765%29.jpg",
  },
  {
    busName: "Classic Revival Garage",
    category: "Automotive",
    description:
      "Restoration business dedicated to bringing classic and vintage cars back to life, using authentic parts and expert craftsmanship.",
    busImage:
      "https://freerangestock.com/sample/161105/vintage-car-showcased-at-a-sunny-field.jpg",
  },
  {
    busName: "WellPath Wellness Center",
    category: "Healthcare",
    description:
      "A holistic health clinic offering integrative treatments such as acupuncture, massage therapy, and nutrition counseling to promote overall well-being.",
    busImage:
      "https://images.pexels.com/photos/105028/pexels-photo-105028.jpeg",
  },
  {
    busName: "HomeMed Assist",
    category: "Healthcare",
    description:
      "A service providing professional in-home healthcare support for seniors and people with chronic illnesses, allowing them to receive care in the comfort of their homes.",
    busImage:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Compassion_holding_hands.jpg",
  },
  {
    busName: "MindCare Mental Health Services",
    category: "Healthcare",
    description:
      "Mental health clinic specializing in therapy and counseling services, offering both in-person and telehealth options for individuals and families.",
    busImage:
      "https://upload.wikimedia.org/wikipedia/commons/4/4f/The_Mental_Health_Flag.png",
  },
  {
    busName: "TeleHealthNow",
    category: "Healthcare",
    description:
      "Healthcare technology company providing a comprehensive telemedicine platform for doctors and patients to connect virtually, enabling easier access to care.",
    busImage:
      "https://images.pexels.com/photos/7195379/pexels-photo-7195379.jpeg",
  },
  {
    busName: "FitForLife Rehab Center",
    category: "Healthcare",
    description:
      "Rehabilitation center offering physical therapy, occupational therapy, and fitness programs for patients recovering from surgery or injury.",
    busImage:
      "https://images.pexels.com/photos/6111588/pexels-photo-6111588.jpeg",
  },
  {
    busName: "JetStream Private Air",
    category: "Travel",
    description:
      "A private jet charter service providing luxury air travel for business executives and VIPs, ensuring comfort, safety, and efficiency.",
    busImage:
      "https://upload.wikimedia.org/wikipedia/commons/7/76/British_Aerospace_Jetstream_32_reg._N487UE.jpg",
  },
  {
    busName: "GoGlobal Adventure Travel",
    category: "Travel",
    description:
      "Travel agency specializing in adventure and eco-tourism packages, offering curated trips to remote destinations with a focus on sustainability.",
    busImage:
      "https://freerangestock.com/sample/44507/remote-island-in-the-middle-of-the-ocean.jpg",
  },
  {
    busName: "LuxRide Limousines",
    category: "Travel",
    description:
      "A high-end limousine service offering luxury rides for special events, weddings, and corporate functions, with an emphasis on customer service and comfort.",
    busImage:
      "https://upload.wikimedia.org/wikipedia/commons/9/97/Lincoln_MKT_limo.JPG",
  },
  {
    busName: "GreenTransit Shuttle",
    category: "Travel",
    description:
      "An eco-friendly shuttle service operating electric buses for local public transport, reducing emissions and providing an affordable green travel option.",
    busImage:
      "https://upload.wikimedia.org/wikipedia/commons/1/1c/NUS_Shuttle_Bus_PC3763G_at_COM2.jpg",
  },
  {
    busName: "Urban Bike Share",
    category: "Travel",
    description:
      "Bike-sharing service providing affordable and convenient bicycle rentals across urban areas, promoting eco-friendly transportation in the city.",
    busImage:
      "https://freerangestock.com/sample/173152/locked-bicycle-on-a-city-street.jpg",
  },
];

const dropTables = async () => {
  try {
    await client.query(`DROP TABLE IF EXISTS users CASCADE`);
    await client.query(`DROP TABLE IF EXISTS businesses CASCADE`);
    await client.query(`DROP TABLE IF EXISTS reviews CASCADE`);
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
    busName VARCHAR(64) UNIQUE NOT NULL,
    category VARCHAR(64) NOT NULL,
    description VARCHAR(1023) NOT NULL,
    busImage VARCHAR(255) DEFAULT 
      'https://static.wixstatic.com/media/40bb67_32a45a704190429eb53a3f3cd1336cb8~mv2.jpg/v1/fill/w_528,h_420,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/40bb67_32a45a704190429eb53a3f3cd1336cb8~mv2.jpg'
  )`);

  await client.query(`
    CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    userID UUID REFERENCES users(id),
    businessID INT REFERENCES businesses(id),
    raitng INT REFERENCES businesses(id),
    rating INT NOT NULL,
    review TEXT,
    createdAt TIMESTAMP DEFAULT now() 
    )
    `);
};

const insertBusinesses = async () => {
  try {
    for (const business of businesses) {
      await createBusiness(business);
    }
  } catch (err) {
    console.log(err);
  }
};

const init = async () => {
  await client.connect();
  console.log("connected to database");

  await dropTables();
  console.log("tables dropped");
  await createTables();
  console.log("tables created");

  await insertBusinesses();
  console.log("businesses inserted");

  const [moe, lucy, ethyl, curly] = await Promise.all([
    createUser({ username: "moe", password: "m_pw" }),
    createUser({ username: "lucy", password: "l_pw" }),
    createUser({ username: "ethyl", password: "e_pw" }),
    createUser({ username: "curly", password: "c_pw" }),
  ]);

  console.log(await fetchUsers());
  client.end();
};

init();
