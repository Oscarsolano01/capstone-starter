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

router.get("/business/:businessId", async (req, res, next) => {
  let businessId = req.params.businessId;
  try {
    res.send(await fetchSingleBusinessReviews(businessId));
  } catch (ex) {
    next(ex);
  }
});

router.delete("/business/:businessId", async (req, res) => {
  try {
    const reviewId = req.params.id;
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
