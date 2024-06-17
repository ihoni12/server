const express = require('express');
const AllInf = require('../models/ModelAllThogether');
const valoresSheferArray = require('../HelpComponents/valoresSheferArray');
const valoresSvuyArray = require('../HelpComponents/valoresSvuyArray');
const valoresJodsiArray = require('../HelpComponents/valoresJodsiArray');
const router = express.Router();

router.post('/setAdminThogether', async (req, res) => {
    try {
        // Incrementa svuy según el día actual
        const diaActual = new Date().getDay(); // 0 para domingo, 1 para lunes, ..., 6 para sábado
        const nuevoSvuy = diaActual;

        // Incrementa shefer de 1 a 5 en un bucle
        const nuevoShefer = 0;

        const diaDelMes = new Date().getDate(); //enviar si es un deia menos en el mes///////////////////////////////
        // Crea un nuevo documento con los valores actualizados
        const nuevoDocumento = new AllInf({
            yomi: [{ 0: 0 }],
            svuy: valoresSvuyArray(nuevoSvuy),
            shefer: valoresSheferArray(nuevoShefer),
            jodsi: valoresJodsiArray(diaDelMes),
        });

        // Guarda el nuevo documento en la base de datos
        await nuevoDocumento.save();

        res.status(201).json({ mensaje: 'Información creada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
