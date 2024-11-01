const express = require('express');
const { akdashaInf } = require('../models/akdashaModel');
const { decodificarToken } = require('../Seguridad/decodeToken');
const router = express.Router();

router.post('/sumarAkdashot', async (req, res) => {
    try {
        const {
            token,
            paraQuien,
            montoPago,
            fechaDeEmpieza,
            mesesPagados,
            tipo,
            ptira,
        } = req.body;
        const dec = decodificarToken(token);
        if (!dec) return res.status(401).send({ msg: 'Token no valido' });

        const newAkdashot = new akdashaInf({
            IDdueno: dec.userId,
            paraQuien,
            montoPago,
            fechaDeEmpieza,
            mesesPagados,
            tipo,
            ptira,
        });
        await newAkdashot.save();
        res.status(201).json({ msg: 'paso' }); //devuelvo lo que obtiene en 'savedUder' que es bueno, 201 = corecto
    } catch (err) {
        res.status(500).json({ error: err.message }); //si es un error devuelve el error
    }
});

module.exports = router;
