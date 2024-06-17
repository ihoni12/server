const jwt = require('jsonwebtoken');

const secreto = 'EXOESQUELETO'; // Reemplaza con la clave secreta que utilizaste para firmar el token

// Función para decodificar un token JWT
const decodificarToken = (token) => {
    try {
        // Decodificar el token y devolver la información decodificada
        const decoded = jwt.verify(token, secreto);
        return decoded;
    } catch (error) {
        // Manejar el error, por ejemplo, token inválido o expirado
        console.error('Error al decodificar el token:', error);
        return null;
    }
};
module.exports = { decodificarToken };
