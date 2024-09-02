const express = require('express');
const Bidon = require('../models/Bidon');
const router = express.Router();

router.post('/devuelveBidones', async (req, res) => {
    try {
        //cambio 7
        const { key } = req.body;
        if (/*key != 'hola'*/ false) {
            return res.status(401).send({ msg: 'Key no valido' });
        }

        const bidones = await Bidon.find();

        res.status(200).json(bidones);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
