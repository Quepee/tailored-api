const classifyService = require("../services/classifier");

exports.classifyNumber = async (req, res) => {
    const { number } = req.params; // Using path parameter instead of query

    // Validate input
    if (!/^-?\d+$/.test(number)) {
        return res.status(400).json({ number, error: true });
    }

    const num = parseInt(number, 10);

    try {
        const result = await classifyService.classify(num);
        res.json(result);
    } catch (error) {
        console.error("Classification Error:", error.message);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};
