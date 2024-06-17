const express = require('express');
const user = require('../models/usuarioModel');
const router = express.Router();

//devuelve la informacion del usuario
router.post('/usuinfo', async (req, res) => {
    try {
        const { IDusuario } = req.body;

        const infoUser = await user.findOne({ _id: IDusuario });
        if (!infoUser) {
            return res.status(404).json();
        }

        const newInfoUser =
            '<p>' +
            infoUser.usuName +
            '</p><p>' +
            infoUser.email +
            '</p><p>' +
            infoUser.allName +
            '</p><p>' +
            infoUser.lName +
            '</p><p>' +
            infoUser.momAllName +
            '</p>';

        res.status(200).json(newInfoUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}); //user

module.exports = router;
