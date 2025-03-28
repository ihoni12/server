const express = require('express');
const Bidones = require('../models/Bidon');
const router = express.Router();
const rateLimit = require('express-rate-limit');

// Configura el limitador de solicitudes: Máximo 50 por día
const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
    max: 150, // Máximo de 50 solicitudes por IP
    message: { msg: 'Has superado el límite de 50 solicitudes por día.' },
    standardHeaders: true, // Devuelve información en los headers `RateLimit-*`
    legacyHeaders: false, // Desactiva los headers `X-RateLimit-*`
});

router.post('/devuelveBidones', limiter, async (req, res) => {
    try {
        //cambio 7
        const { key } = req.body;
        let nivel = 2;

        if (key === 'hola') {
            nivel = 1;
        } else if (key === 'que') {
            nivel = 2;
        } else {
            return res.status(401).send({ msg: 'Key no valido' });
        }
        console.log('nivel ', nivel);

        const bidones = await Bidones.find();
        console.log(bidones);

        res.status(200).json({ bi: bidones, nivel: nivel });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
