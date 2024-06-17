const express = require('express');
const AllInf = require('../models/ModelAllThogether');
const router = express.Router();

router.get('/getAdminThogether', async (req, res) => {
    try {
        const info = await AllInf.find().sort({ date: -1 }).limit(5);
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
