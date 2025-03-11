const express = require('express');
const Bidones = require('../models/Bidon');
const router = express.Router();

router.post('/bidonUpdate', async (req, res) => {
    try {
        const { newBidon } = req.body;

        const campos = newBidon.split(',');
        console.log(campos);

        // Validar el código en la primera posición
        if (campos[0] !== 'porque') {
            return res
                .status(403)
                .json({ mensaje: 'Código incorrecto, acceso denegado' });
        }

        const parseDate = (dateStr) => {
            if (dateStr) {
                const [day, month, year] = dateStr.split('/').map(Number);
                return new Date(year, month - 1, day);
            }
            return null;
        };

        const datos = {};
        const camposDefinidos = [
            'name',
            'bid',
            'chad',
            'DA',
            'DB',
            'NJP',
            'MAU12',
            'piva',
            'mibchai',
            'camutGijot',
            'mikum',
            'mana',
            'murcav',
            'takul',
            'nameNamad',
            'namePiva',
            'takalaInfo',
            'memsarim',
            'lastTisa',
        ];

        camposDefinidos.forEach((campo, index) => {
            if (campos[index + 1] && campos[index + 1] !== 'null') {
                if (
                    [
                        'DA',
                        'DB',
                        'NJP',
                        'MAU12',
                        'piva',
                        'memsarim',
                        'lastTisa',
                    ].includes(campo)
                ) {
                    datos[campo] = parseDate(campos[index + 1]);
                } else if (
                    campos[index + 1] === 'true' ||
                    campos[index + 1] === 'false'
                ) {
                    datos[campo] = campos[index + 1] === 'true';
                } else if (!isNaN(campos[index + 1])) {
                    datos[campo] = parseInt(campos[index + 1]);
                } else {
                    datos[campo] = campos[index + 1];
                }
            }
        });

        const resultado = await Bidones.findOneAndUpdate(
            { name: datos.name },
            { $set: datos },
            { new: true }
        );

        res.json({ mensaje: 'Documento actualizado', resultado });
    } catch (error) {
        console.error('Error al actualizar el documento:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el documento' });
    }
});

module.exports = router;
