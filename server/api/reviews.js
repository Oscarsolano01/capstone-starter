const express = require("express");
const router = express.Router();

const {
  fetchReviews,
  createReviews,
  fetchSingleBusinessReviews,
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchReviews());
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log("creating new review");
  try {
    const newReview = await createReviews(req.body);
    console.log(newReview);
    res.send(newReview);
  } catch (error) {
    next(error);
  }
});

// POST /api/reviews
// router.post("/reviews", async (req, res) => {
//   const { userId, businessId, rating, review } = req.body;

//   if (!userId || !businessId || !rating || !review) {
//     return res.status(400).json({ error: "All fields are required." });
//   }

//   try {
//     const newReview = await Review.create({
//       userId,
//       businessId,
//       rating,
//       review,
//     });
//     res.status(201).json(newReview);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to submit review." });
//   }
// });

router.get("/business/:businessId", async (req, res, next) => {
  let businessId = req.params.businessId;
  try {
    res.send(await fetchSingleBusinessReviews(businessId));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
