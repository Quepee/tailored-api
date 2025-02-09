const classifyService = require("../services/classifyService");
const axios = require("axios");

exports.classifyNumber = async (req, res) => {
    const { number } = req.params;

    if (!/^-?\d+$/.test(number)) {
        return res.status(400).json({ number, error: true });
    }

    const num = parseInt(number, 10);
    const properties = classifyService.getNumberProperties(num);

    try {
        const factResponse = await axios.get(`http://numbersapi.com/${num}/math`);
        const fun_fact = factResponse.data;

        res.json({ number: num, ...properties, fun_fact });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch fun fact" });
    }
};
