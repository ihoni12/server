const express = require('express');
const user = require('../models/usuarioModel');
const router = express.Router();
const { modeloInf } = require('../models/ModelOne');
const { decodificarToken } = require('../Seguridad/decodeToken');

//devuelve la informacion del usuario
router.post('/suveOneInfo', async (req, res) => {
    try {
        const { one, token, timeMessanger } = req.body;

        const newOnes = one.map((item) => {
            return new modeloInf(item);
        });

        const dec = decodificarToken(token);

        if (!dec) return res.status(401).send({ msg: 'Token no valido' });

        const userId = { _id: dec.userId };

        // Actualiza el contador en estudio del usuario
        const quees = await user.findByIdAndUpdate(userId, {
            $set: { planes: newOnes, timeMessanger: timeMessanger },
        });
        //console.log(quees);
        res.status(200).json({ success: true, msg: 'Actualización exitosa' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}); //user

module.exports = router;
