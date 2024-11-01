const express = require('express');
const { akdashaInf } = require('../models/akdashaModel');
const { decodificarToken } = require('../Seguridad/decodeToken');
const router = express.Router();

//  devuelve informacion de las akdashot del usuario
router.post('/usuinfomakdis', async (req, res) => {
    try {
        const { token } = req.body;
        const dec = decodificarToken(token);
        if (!dec) return res.status(401).send({ msg: 'Token no valido' });
        // busca el id en la base de datos y lo retorna
        const userId = { IDdueno: dec.userId };
        const infoakdashotList = await akdashaInf.find(userId);

        if (!infoakdashotList || infoakdashotList.length === 0) {
            return res
                .status(404)
                .json({ msg: 'No existen akdasas para este usuario' });
        }

        const resultado = infoakdashotList.map((item) => ({
            id: item._id,
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
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
