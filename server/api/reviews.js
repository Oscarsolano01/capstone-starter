const express = require("express");
const router = express.Router();

const {
  fetchReviews,
  createReviews,
  fetchSingleBusinessReviews,
  fetchUsers,
  deleteReview,
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

router.delete("/:reviewId", async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const result = await deleteReview(reviewId);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
