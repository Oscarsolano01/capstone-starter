const express = require("express");
const router = express.Router();

const { fetchBusinesses, fetchSingleBusiness } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchBusinesses());
  } catch (ex) {
    next(ex);
  }
});

router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  try {
    res.send(await fetchSingleBusiness(id));
  } catch (ex) {
    next(ex);
  }
});
module.exports = router;
