const express = require('express');
const akdashot = require('../models/akdashaModel');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Clave secreta utilizada para firmar el token (debería ser única y segura)
const secretKey = 'EXOESQUELETO';

const revisaNivel = (token, nivel) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded.userId == nivel) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        // El token es inválido o ha expirado
        console.error('Error al verificar el token:', error.message);
        return false;
    }
};
module.exports = { revisaNivel };
