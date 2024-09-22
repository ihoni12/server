const express = require('express');
const Bidon = require('../models/Bidon');
const router = express.Router();

router.post('/actualizarUno', async (req, res) => {
    try {
        const { id, data, name } = req.body; // Asegúrate de que key está en req.body

        // Usamos findByIdAndUpdate para encontrar y actualizar el documento
        const updatedBidon = await Bidon.findByIdAndUpdate(
            id,
            { [name]: data }, // Actualiza el campo dinámicamente usando el valor de 'name'
            { new: true } // Opción para devolver el documento actualizado
        );

        if (!updatedBidon) {
            return res.status(404).json({ msg: 'Bidon no encontrado' });
        }

        // Devuelve una respuesta de éxito con el documento actualizado
        res.status(200).json();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
