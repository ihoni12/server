const express = require('express');
const router = express.Router();
const juntos = require('../models/ModelAllThogether');

router.post('/leyoThogether', async (req, res) => {
    try {
        const { index } = req.body;
        console.log('asdas');

        // Encuentra el documento más reciente
        await juntos.findOneAndUpdate(
            {},
            { $inc: { [`allSheferThogether.${index}`]: 1 } },
            { sort: { date: -1 }, new: true }
        );
        /*
        //enviar sumar 1 leyo, lla hay uno no es necesarios
        await AllIn.findOneAndUpdate(
            {},
            { $inc: { [`allSheferThogether.${index}`]: 1 } },
            { sort: { date: -1 }, new: true }
        );
        */
        res.status(200).json({ success: true, msg: 'Actualización exitosa' });
    } catch (err) {
        res.status(500).json({ msg: 2 });
    }
});

module.exports = router;
