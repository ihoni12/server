const express = require('express');
const juntos = require('../models/ModelAllThogether');
const router = express.Router();

//devuelve la informacion del usuario
router.post('/obtenerEstudian', async (req, res) => {
    try {
        const { cualesEstudian } = req.body;

        const proyeccion = { _id: 0 };
        proyeccion[cualesEstudian] = 1;
        const infoEstudian = await juntos
            .findOne({}, proyeccion)
            .sort({ date: -1 });

        if (!infoEstudian) {
            return res
                .status(404)
                .json({ mensaje: 'Documento principal no encontrado' });
        }

        const resultado = infoEstudian[cualesEstudian];
        console.log(resultado);

        return res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
