const express = require('express');
const router = express.Router();
const { analyzeDesign } = require('../analysis');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const result = await analyzeDesign(data);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
