const express = require('express');
const juntos = require('../models/ModelAllThogether');
const router = express.Router();

//devuelve la informacion del usuario
router.post('/obtenerEstudioThogether', async (req, res) => {
    try {
        const infoEstudian = await juntos.findOne({}).sort({ date: -1 });
        // Accede a la propiedad allSheferThogether y encuentra el valor mínimo
        const valoresAllShefer = Object.values(infoEstudian.allSheferThogether);

        const valorMinimo = Math.min(...valoresAllShefer);

        const indiceDelMinimo = valoresAllShefer.indexOf(valorMinimo);
        if (!infoEstudian) {
            return res
                .status(404)
                .json({ mensaje: 'Documento principal no encontrado' });
        }
        return res.status(200).json({
            minEstudian: indiceDelMinimo != -1 ? indiceDelMinimo : 0,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
