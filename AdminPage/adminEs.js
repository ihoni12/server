const express = require('express');
const { decodificarToken } = require('../Seguridad/decodeToken');
const router = express.Router();

router.post('/revisaEsAdmin', async (req, res) => {
    try {
        console.log('entro admin');
        //para activar admin tiene que desconectar entrar otro usuario y volver a entrar
        const { tokenGuardado } = req.body;
        const dec = decodificarToken(tokenGuardado);
        if (!dec) return res.status(401).send({ msg: 'Token no valido' });
        if (dec.nivel == 100) {
            res.status(200).json(true);
        } else {
            res.status(200).json(false);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
