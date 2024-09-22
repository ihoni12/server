const express = require('express');
const Bidones = require('../models/Bidon');
const router = express.Router();

router.post('/borrarUno', async (req, res) => {
    try {
        const { id } = req.body; // Asegúrate de que el id está en req.body

        // Verifica si el id fue enviado
        if (!id) {
            return res.status(400).json({ error: 'ID no proporcionado' });
        }

        // Busca y elimina el bidón con el id proporcionado
        const bidonEliminado = await Bidones.findByIdAndDelete(id);

        // Si no se encuentra el bidón con el ID proporcionado
        if (!bidonEliminado) {
            return res.status(404).json({ error: 'Bidón no encontrado' });
        }

        // Devuelve una respuesta con éxito
        res.status(200).json();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
