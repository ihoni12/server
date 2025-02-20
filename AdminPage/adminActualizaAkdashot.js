const express = require('express');
const { akdashaInf } = require('../models/akdashaModel');
const router = express.Router();
router.post('/actualizaAkdasha', async (req, res) => {
    const { id, pasa } = req.body;
    try {
        await akdashaInf.findByIdAndUpdate(id, { pasa });
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});
module.exports = router;
