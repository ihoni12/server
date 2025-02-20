const express = require('express');
const { akdashaInf } = require('../models/akdashaModel');
const router = express.Router();

router.post('/revisaAdminAkdasot', async (req, res) => {
    const infoakdashotListAll = await akdashaInf.find({ pasa: null });

    if (!infoakdashotListAll || infoakdashotListAll.length === 0) {
        return res.status(404).json({ msg: 9 });
    }
    res.status(200).json(infoakdashotListAll);
});

module.exports = router;
