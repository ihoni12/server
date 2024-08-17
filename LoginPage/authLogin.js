const express = require('express');
const user = require('../models/usuarioModel');
const juntos = require('../models/ModelAllThogether');
const router = express.Router();
//crypto la contracena
const bcrypt = require('bcrypt');
//crea un  token

const { generarToken } = require('../Seguridad/createToken');

// Inicio de sesión
router.post('/signin', async (req, res) => {
    try {
        // Obtener los datos de inicio de sesión del cuerpo de la solicitud
        const { usuName, contracena, email } = req.body;

        // Buscar el usuario en la base de datos por su correo electrónico o nombre de usuario
        const loginUser = await user.findOne({
            $or: [{ email: email }, { usuName: usuName }],
        });

        // Si no se encuentra el usuario, devolver un error 404
        if (!loginUser) {
            return res.status(404).json({ msg: 1 });
        }

        // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
        const confirmedPassword = await bcrypt.compare(
            contracena,
            loginUser.contracena
        );

        // Si la contraseña no coincide, devolver un error 400
        if (!confirmedPassword) {
            return res.status(400).json({ msg: 1 });
        }
        //obtener token
        const token = generarToken(loginUser._id, loginUser.nivel);
        //obtener informacion de allthogether

        const infoEstudian = await juntos.findOne({}).sort({ date: -1 });
        //! si entra desde otro telefono von la misma cuanta le falta informacion guardada

        // Devolver los datos del us
        res.status(200).json({
            tokens: token,
            estudian: infoEstudian
                ? {
                      date: infoEstudian.date,
                      yomi: infoEstudian.yomi,
                      svuy: infoEstudian.svuy,
                      jodsi: infoEstudian.jodsi,
                      shefer: infoEstudian.shefer,
                  }
                : null,
            personal: {
                nombre: loginUser.allName,
                apellidos: loginUser.lName,
                correo: loginUser.email,
                dad: loginUser.dadAllName,
                mom: loginUser.momAllName,
                genero: loginUser.genero,
            },
            timeMessanger: loginUser.alertas,
        });
    } catch (err) {
        // Si ocurre un error, devolver un error 500 con el mensaje de error
        res.status(500).json({ msg: 2 });
    }
}); //user
module.exports = router;
