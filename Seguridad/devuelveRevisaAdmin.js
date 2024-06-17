const { decodificarToken } = require('./decodeToken');
const express = require('express');
const router = express.Router();

router.post('/revisaNivelAdmin', async (req, res) => {
    try {
        const { token } = req.body;

        // Ejemplo de uso
        const informacionDecodificada = decodificarToken(token);
        console.error('aqui');

        if (informacionDecodificada) {
            if (informacionDecodificada.nivel === 100) {
                // Nivel válido
                res.status(200).json({ nivelValido: true });
            } else {
                // Nivel no válido
                res.status(200).json({ nivelValido: false });
            }
        } else {
            // Error al decodificar el token
            res.status(500).json({ error: 'Error al decodificar el token.' });
        }
    } catch (err) {
        // Error en el servidor
        console.log({ error: err.message });
        res.status(500).json({ error: 'Error en el servidor.' });
    }
});

module.exports = router;
