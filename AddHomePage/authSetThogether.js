const express = require('express');
const user = require('../models/usuarioModel');
const router = express.Router();

router.post('/revisaThogether', async (req, res) => {
    try {
        const { IDusuario, type } = req.body;

        const updateObject = {};
        updateObject[`metido.${type}`] = true;
        const updatedUser = await user.findByIdAndUpdate(
            IDusuario,
            { $set: updateObject },
            { new: true } // Devuelve el documento actualizado
        );

        if (!updatedUser) {
            return res
                .status(404)
                .json({ mensaje: 'Documento principal no encontrado' });
        }

        return res.status(201).json({
            mensaje: 'Subdocumento agregado con éxito al documento principal',
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
