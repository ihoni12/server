const express = require('express');
const { modeloTfila } = require('../models/Tfilot');
const { decodificarToken } = require('../Seguridad/decodeToken');
const router = express.Router();

router.post('/sumarLugar', async (req, res) => {
    try {
        const { token, pocicion, dias } = req.body;

        const dec = decodificarToken(token);
        if (!dec) return res.status(401).send({ msg: 'Token no válido' });

        const IDdueno = dec.userId;

        const tfilaArray = dias.map((dia) => ({
            tipo: dia.tipoTefila,
            day: dia.dia,
            type: dia.tipo,
            time: new Date(dia.hora),
            start: dia.dondeEmpieza,
            repite: dia.repite,
            tiempoSale: new Date(dia.tiempoSale), //tiempo de salida
            numeroTransporte: dia.numeroTransporte, //numero de el transporte
            paradaFinal: dia.paradaFinal, //parada final
            nota: dia.nota || null,
            positivos: 0,
            negativos: 0,
            idCreador: IDdueno,
            fechaCreacion: new Date(),
        }));

        const lugarExistente = await modeloTfila.findOne({
            'ubicacion.alt': pocicion.latitude,
            'ubicacion.lon': pocicion.longitude,
        });

        if (lugarExistente) {
            const existentes = lugarExistente.tfila;
            console.log('existentes', existentes);

            const noDuplicados = tfilaArray.filter((nuevo) => {
                return !existentes.some((existe) => {
                    return (
                        existe.tipo === nuevo.tipo &&
                        existe.day === nuevo.day &&
                        existe.type === nuevo.type &&
                        existe.repite === nuevo.repite &&
                        existe.start === nuevo.start &&
                        new Date(existe.time).toISOString() ===
                            nuevo.time.toISOString()
                    );
                });
            });
            console.log('noDuplicados', noDuplicados);

            if (noDuplicados.length > 0) {
                lugarExistente.tfila.push(...noDuplicados);
                await lugarExistente.save();
                return res.status(200).json({
                    msg: 'Días agregados sin duplicados',
                    agregados: noDuplicados.length,
                });
            } else {
                console.log('Todos los días ya existían,no se agregaron dias');

                return res.status(200).json({
                    msg: 'Todos los días ya existían, no se agregó ninguno',
                });
            }
        } else {
            const nuevoLugar = new modeloTfila({
                ubicacion: {
                    alt: pocicion.latitude,
                    lon: pocicion.longitude,
                },
                tfila: tfilaArray,
                IDdueno: IDdueno,
            });

            await nuevoLugar.save();
            return res.status(201).json({ msg: 'Nuevo lugar creado con días' });
        }
    } catch (err) {
        console.error('Error al guardar lugar:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
