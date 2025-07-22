const express = require('express');
const router = express.Router();
const { modeloTfila } = require('../models/Tfilot');

router.post('/buscarLugaresCercanos', async (req, res) => {
    try {
        const { bounds } = req.body;

        if (!bounds) {
            return res
                .status(400)
                .json({ error: 'Faltan los bounds del mapa' });
        }

        // Buscar lugares dentro del área visible
        const lugares = await modeloTfila
            .find({
                'ubicacion.alt': {
                    $gte: bounds.southWest.latitude,
                    $lte: bounds.northEast.latitude,
                },
                'ubicacion.lon': {
                    $gte: bounds.southWest.longitude,
                    $lte: bounds.northEast.longitude,
                },
            })
            .select('-IDdueno -fecha')
            .lean();

        console.log('Bounds:', bounds);

        // Retornar todos los lugares con todas sus tfilot, sin filtrar
        const lugaresSinFiltro = lugares.map((lugar) => ({
            ubicacion: lugar.ubicacion,
            transporte: lugar.transporte,
            tfila: lugar.tfila.map((t) => ({
                _id: t._id,
                tipo: t.tipo,
                day: t.day,
                type: t.type,
                time: t.time,
                start: t.start,
                repite: t.repite,
                tiempoSale: t.tiempoSale,
                numeroTransporte: t.numeroTransporte,
                paradaFinal: t.paradaFinal,
                nota: t.nota,
                positivos: t.positivos,
                negativos: t.negativos,
                idCreador: t.idCreador,
                fechaCreacion: t.fechaCreacion,
            })),
        }));

        return res.status(200).json({ lugares: lugaresSinFiltro });
    } catch (err) {
        console.error('Error buscando lugares cercanos:', err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
