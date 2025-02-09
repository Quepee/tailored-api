const express = require("express");
const classifyController = require("../controllers/classifyController");

const router = express.Router();

// Define the API route without query parameters
router.get("/classify-number/:number", classifyController.classifyNumber);

module.exports = router;
