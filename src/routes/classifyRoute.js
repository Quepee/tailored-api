const express = require("express");
const { classifyNumber } = require("../controllers/classifyController");

const router = express.Router();

router.get("/classify-number/:number", classifyNumber);

module.exports = router;
