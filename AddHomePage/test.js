const express = require('express');
const user = require('../modelsTeilim/ModelAllThogether');
const router = express.Router();

router.post('/test', async (req, res) => {
    try {
        const newuser = new user({
            yomi: [1], //lee uno por dia
            svuy: [1], //termina en una semana
            jodsi: [1], //termina en un mes
            shefer: [1], //termina en 5 dias
        });
        const savedUser = await newuser.save();
        res.status(201).json(savedUser); //devuelvo lo que obtiene en 'savedUder' que es bueno, 201 = corecto
    } catch (err) {
        res.status(500).json({ error: err.message }); //si es un error devuelve el error
    }
}); //user

module.exports = router;
