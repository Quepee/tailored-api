const express = require("express");
const router = express.Router();
const classifyController = require("../controllers/classifyController");

// Define route using a path parameter
router.get("/classify-number/:number", classifyController.classifyNumber);

module.exports = router;
