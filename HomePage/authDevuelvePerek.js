const express = require('express');
const todo = require('../models/todoModel');
const router = express.Router();

// devuelve capitulo
// traer uno o varios pereks de teilim
router.post('/devuelveCapitulo', async (req, res) => {
    try {
        const { capitulo } = req.body;
        const infoTodo = await todo.find();

        if (!infoTodo || infoTodo.length === 0) {
            return res
                .status(404)
                .json({ msg: 'No existen tekstos para estos pereks' });
        }
        const capitulosSeleccionados = capitulo.map(
            (capitulo) => infoTodo[0].text[capitulo]
        );

        res.status(200).json(capitulosSeleccionados);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
