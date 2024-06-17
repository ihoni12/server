const express = require('express');
const { decodificarToken } = require('../Seguridad/decodeToken');
const usuario = require('../models/usuarioModel');
const AllIn = require('../models/AllIn');
const router = express.Router();

//  devuelve informacion de las akdashot del usuario

router.post('/leyo', async (req, res) => {
    try {
        const { token, index, pasaThogetherAll } = req.body;
        const dec = decodificarToken(token);
        if (!dec) {
            return res.status(401).send({ msg: 15 });
        }

        const userId = { _id: dec.userId };

        // Actualiza el contador en estudio del usuario
        await usuario.findOneAndUpdate(userId, {
            $inc: { [`estudio.${index}`]: 1 },
        });
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
