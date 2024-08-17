const express = require('express');
const user = require('../models/usuarioModel');
const { decodificarToken } = require('../Seguridad/decodeToken');
const router = express.Router();

router.post('/devuelveInformacionQueEstudia', async (req, res) => {
    try {
        const { token } = req.body;
        const dec = decodificarToken(token);

        if (!dec) return res.status(401).send({ msg: 'Token no valido' });
        const userId = { _id: dec.userId };

        const estudiaUser = await user.findById(userId);

        if (!estudiaUser) {
            return res
                .status(404)
                .json({ mensaje: 'Documento principal no encontrado' });
        }
        return res.status(200).json({
            planes: estudiaUser.planes,
            timeMessanger: estudiaUser.alertas,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
