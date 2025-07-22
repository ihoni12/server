const express = require('express');
const router = express.Router();
const { modeloTfila } = require('../models/Tfilot');

// POST /api/votarTfila
router.post('/votarTfila', async (req, res) => {
    try {
        const { id, tipo, anterior } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'ID faltante' });
        }

        const update = {};

        if (anterior === 0) update['tfila.$[elem].positivos'] = -1;
        if (anterior === 1) update['tfila.$[elem].negativos'] = -1;

        if (tipo === 0)
            update['tfila.$[elem].positivos'] =
                (update['tfila.$[elem].positivos'] || 0) + 1;
        if (tipo === 1)
            update['tfila.$[elem].negativos'] =
                (update['tfila.$[elem].negativos'] || 0) + 1;

        if (Object.keys(update).length === 0) {
            return res.status(400).json({ error: 'Nada para actualizar' });
        }

        const result = await modeloTfila.updateOne(
            { 'tfila._id': id },
            { $inc: update },
            {
                arrayFilters: [{ 'elem._id': id }],
            }
        );
        console.log('Resultado de la actualización:', result);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Tfila no encontrada' });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error al votar:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
