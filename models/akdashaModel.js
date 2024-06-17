const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const akdasha = new Schema({
    IDdueno: { type: String, required: true, trim: true, minlength: 1 },
    paraQuien: { type: String, required: true, trim: true, minlength: 1 },
    montoPago: { type: Number, required: true, minlength: 1 },
    frchaDePago: {
        type: Date,
        default: Date.now,
        //required: true,
        //min: new Date(),
        //max: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())
    },
    fechaDeEmpieza: {
        type: Date,
        required: true,
        //min: new Date(),
        //max: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())
    },
    mesesPagados: { type: Number, required: true, minlength: 1 },
    tipo: {
        type: String,
        enum: ['Nismat', 'Refua'],
        default: 'Refua',
    },
    creado: { type: Date, default: Date.now },
    ptira: { type: String },
    genero: {
        type: String,
        enum: ['Masculino', 'Femenino'],
        default: 'Masculino',
    }, //Campo de Genero para el Usu
});

const akdashaInf = mongoose.model('akdasha', akdasha);

module.exports = akdashaInf;
