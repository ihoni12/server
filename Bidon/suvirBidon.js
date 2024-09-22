const express = require('express');
const Bidon = require('../models/Bidon');
const router = express.Router();

router.post('/nuevoBidon', async (req, res) => {
    try {
        //cambio 7

        const { key, newItem } = req.body;
        console.log(key);
        console.log(newItem);

        if (key === 'que') {
            return res.status(401).send({ msg: 'Key no valido' });
        }
        const {
            name,
            bid,
            chad,
            DA,
            DB,
            NJP,
            MAU12,
            piva,
            mibchai,
            camutGijot,
            mikum,
            mana,
            murcav,
            takul,
            nameNamad,
            namePiva,
            takalaInfo,
            memsarim,
            lastTisa,
        } = newItem;

        const newBidon = new Bidon({
            name,
            bid,
            chad,
            DA,
            DB,
            NJP,
            MAU12,
            piva,
            mibchai,
            camutGijot,
            mikum,
            mana,
            murcav,
            takul,
            nameNamad,
            namePiva,
            takalaInfo,
            memsarim,
            lastTisa,
        });

        await newBidon.save();
        console.log('pasa');

        res.status(201).json({ msg: 'paso' }); //devuelvo lo que obtiene en 'savedUder' que es bueno, 201 = corecto
    } catch (err) {
        res.status(500).json({ error: err.message }); //si es un error devuelve el error
    }
});

module.exports = router;
