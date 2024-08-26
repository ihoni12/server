const express = require('express');
const router = express.Router();

// Ruta de salud
router.post('/conectadoCheck', (req, res) => {
    res.send('Server is running');
});

module.exports = router;
