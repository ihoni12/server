const express = require('express');
const User = require('../models/usuarioModel'); // Asumiendo que este es el modelo de tu usuario
const { decodificarToken } = require('../Seguridad/decodeToken');
const router = express.Router();

router.post('/borrarUsuario', async (req, res) => {
    try {
        const { token } = req.body;
        const dec = decodificarToken(token);

        if (!dec) return res.status(401).send({ msg: 'Token no válido' });

        // Obtener el ID del usuario del token decodificado
        const userId = dec.userId;

        // Eliminar el usuario basado en su ID
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        return res
            .status(200)
            .json({
                success: true,
                mensaje: 'Usuario eliminado correctamente',
            });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
