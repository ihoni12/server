const express = require('express');
const AllIn = require('../models/AllIn');
const router = express.Router();

//devuelve la informacion del usuario
router.post('/obtenerEstudioThogether', async (req, res) => {
    try {
        const infoEstudian = await AllIn.findOne({}).sort({ date: -1 });

        // Accede a la propiedad allSheferThogether y encuentra el valor mínimo
        const valoresAllShefer = Object.values(
            infoEstudian.pidieronAllSheferThogether
        );
        const valorMinimo = Math.min(...valoresAllShefer);

        // Encuentra el índice del valor mínimo
        const indiceDelMinimo = valoresAllShefer.indexOf(valorMinimo);

        // Realiza la actualización, incrementando el valor del índice correspondiente
        await AllIn.findOneAndUpdate(
            { _id: infoEstudian._id }, // Usamos el _id del documento encontrado anteriormente
            { $inc: { [`pidieronAllSheferThogether.${indiceDelMinimo}`]: 1 } }, // Incrementamos el valor en el índice encontrado
            {}
        );

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
