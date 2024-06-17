// tokenHandler.js
const jwt = require('jsonwebtoken');

const generarToken = (userId, nivel, opciones = {}) => {
    // Define la información que deseas incluir en el token
    const payload = { userId: userId, nivel: nivel };

    // Firma el token con una clave secreta
    const secreto = 'EXOESQUELETO'; // Reemplaza con una clave segura

    // Elimina expiresIn de las opciones si deseas que el token no expire
    if (opciones.expiresIn) {
        delete opciones.expiresIn;
    }

    // Genera el token utilizando jwt.sign
    const token = jwt.sign(payload, secreto, opciones);

    return token;
};

module.exports = { generarToken };
