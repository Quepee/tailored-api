const express = require("express");
const { classify } = require("../services/classifier"); // Import the classify function

const router = express.Router();

router.get("/classify/:number", async (req, res) => {
    const number = parseInt(req.params.number);

    if (isNaN(number)) {
        return res.status(400).json({ error: "Invalid number" });
    }

    try {
        const result = await classify(number);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
