const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BidonSchema = new Schema({
    //cambio 6

    // Nombre del bidón
    name: { type: String, required: true, trim: true, minlength: 1 },

    // Tipo de bidón, debe ser uno de los valores permitidos
    bid: {
        type: Number,
        required: true,
        enum: [600, 370, 300],
    },

    // Lado del bidón ('l' o 'r')
    chad: {
        type: String, // Cambiado de Char a String
        enum: ['l', 'r'],
        default: null,
    },

    // Fechas asociadas con el bidón
    DA: {
        type: Date,
        default: null,
    },
    DB: {
        type: Date,
        default: null,
    },
    DD: {
        type: Date,
        default: null,
    },
    piva: {
        type: Date,
        default: null,
    },

    // Fecha de creación
    creado: { type: Date, default: Date.now },
});

// Definir el modelo
const Bidones = mongoose.model('bidones', BidonSchema);

module.exports = Bidones;
