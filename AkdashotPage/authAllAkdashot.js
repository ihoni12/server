const express = require('express');
const { akdashaInf } = require('../models/akdashaModel');
const router = express.Router();

//devuelve todas las akdashot
router.post('/usuMakdisAll', async (req, res) => {
    try {
        const infoakdashotListAll = await akdashaInf.find();

        if (!infoakdashotListAll || infoakdashotListAll.length === 0) {
            return res.status(404).json({ msg: 9 });
        }
        const resultado = infoakdashotListAll.map((item) => ({
            paraQuien: item.paraQuien,
            montoPago: item.montoPago,
            fechaDeEmpieza: item.fechaDeEmpieza,
            mesesPagados: item.mesesPagados,
            genero: item.genero,
            tipo: item.tipo,
            ptira: item.ptira,
        }));
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ msg: 2 });
    }
});
module.exports = router;
