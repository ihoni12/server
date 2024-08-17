const express = require('express');
const user = require('../models/usuarioModel');
const juntos = require('../models/ModelAllThogether');
const router = express.Router();
//crypto la contracena
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rondas de sal (cuanto mayor, más seguro pero más lento)
//regristo
const { generarToken } = require('../Seguridad/createToken');

router.post('/signup', async (req, res) => {
    try {
        const {
            usuName,
            contracena,
            Lcontracena,
            email,
            fName,
            allName,
            lName,
            dadAllName,
            momAllName,
            nacimiento,
        } = req.body;
        // Verificar si el correo electrónico o el nombre de usuario ya existen
        const existingUser = await user.findOne({
            $or: [{ email: email }, { usuName: usuName }],
        });

        if (existingUser) {
            return res.status(400).json({ msg: 7 });
        }

        if (contracena !== Lcontracena) {
            return res.status(400).json({ msg: 8 });
        }

        const newuser = new user({
            usuName,
            contracena,
            Lcontracena,
            email,
            fName,
            allName,
            lName,
            dadAllName,
            momAllName,
            nacimiento,
        });

        bcrypt.hash(contracena, saltRounds, async (err, hash) => {
            if (err) {
                return res.status(500).json({ msg: 2 });
            }
            newuser.contracena = hash;
            const savedUser = await newuser.save();
            //token
            const token = generarToken(savedUser._id, savedUser.nivel);
            //estudian
            const infoEstudian = await juntos.findOne({}).sort({ date: -1 });
            res.status(201).json({
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
                    nombre: savedUser.allName,
                    apellidos: savedUser.lName,
                    correo: savedUser.email,
                    dad: savedUser.dadAllName,
                    mom: savedUser.momAllName,
                    genero: savedUser.genero,
                },
                tokens: token,
                timeMessanger: savedUser.alertas,
            }); //devuelvo lo que obtiene en 'savedUder' que es bueno, 201 = corecto
        });
    } catch (err) {
        res.status(500).json({ msg: 2 }); //si es un error devuelve el error
    }
}); //user

module.exports = router;
