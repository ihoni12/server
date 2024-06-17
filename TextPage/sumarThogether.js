const express = require('express');
const router = express.Router();
const AllInf = require('../models/ModelAllThogether');
const AllIn = require('../models/AllIn');

router.post('/leyoThogether', async (req, res) => {
    try {
        const { index } = req.body;

        // Encuentra el documento más reciente
        await AllInf.findOneAndUpdate(
            {},
            { $inc: { [`allSheferThogether.${index}`]: 1 } },
            { sort: { date: -1 }, new: true }
        );
        await AllIn.findOneAndUpdate(
            {},
            { $inc: { [`allSheferThogether.${index}`]: 1 } },
            { sort: { date: -1 }, new: true }
        );
        res.status(200).json({ success: true, msg: 'Actualización exitosa' });
    } catch (err) {
        res.status(500).json({ msg: 2 });
    }
});

module.exports = router;
