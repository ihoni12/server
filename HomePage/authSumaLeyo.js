const express = require('express');
const user = require('../models/usuarioModel');
const router = express.Router();

router.post('/sumarLeyo', async (req, res) => {
    try {
        const { IDusuario, indice } = req.body;

        // Utiliza `findByIdAndUpdate` para incrementar el valor en el índice

        const updateObject = {};
        updateObject[`estudio.${indice}`] = 1;
        const result = await user.findByIdAndUpdate(
            IDusuario,
            { $inc: updateObject },
            { new: true } // Para devolver el documento modificado
        );
        console.log(indice);

        // Verifica si el documento fue encontrado y actualizado
        if (!result) {
            return res
                .status(404)
                .json({ mensaje: 'Documento principal no encontrado' });
        }
        return res.status(200).json();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
