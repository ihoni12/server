const express = require('express');
const { akdashaInf } = require('../models/akdashaModel');
const router = express.Router();

//devuelve todas las akdashot
router.post('/usuMakdisAll', async (req, res) => {
    try {
        // Obtenemos la fecha actual (o la fecha deseada para comparar)
        const currentDate = new Date();

        // Buscar registros donde la fecha esté entre 'fechaDeEmpieza' y 'fechaDeEmpieza + mesesPagados'
        const infoakdashotListAll = await akdashaInf.find({
            pasa: true, // Solo registros donde pasa sea true
            fechaDeEmpieza: { $lte: currentDate }, // 'fechaDeEmpieza' debe ser menor o igual a la fecha actual
            // hay que Calcular la fecha final tomando 'fechaDeEmpieza' + 'mesesPagados'
        });
        console.log(infoakdashotListAll);

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
