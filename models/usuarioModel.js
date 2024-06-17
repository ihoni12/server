const mongoose = require('mongoose');
const { modeloNoJson } = require('./ModelOne');
const Schema = mongoose.Schema;
//'type' tipo
//'required' oblicatorio?
//'trim' desaparece los espacios en blanco antes y despues
//'minlength' minimo de largo 1 para que no existan vacisos
const usuario = new Schema({
    usuName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
    },
    contracena: { type: String, required: true, trim: true, minlength: 1 },
    email: { type: String, trim: true, unique: true },
    fName: { type: String, required: true, trim: true, minlength: 1 },
    allName: { type: String, required: true, trim: true, minlength: 1 },
    lName: { type: String, required: true, trim: true, minlength: 1 },
    dadAllName: { type: String, required: true, trim: true, minlength: 1 },
    momAllName: { type: String, required: true, trim: true, minlength: 1 },
    nacimiento: { type: Date, required: false },
    creado: { type: Date, default: Date.now },
    nivel: { type: Number, required: true, default: 1 },
    genero: {
        type: String,
        enum: ['Masculino', 'Femen'],
        default: 'Masculino',
    },
    planes: { type: [modeloNoJson] },
    metido: {
        yomi: { type: Boolean, required: true, default: false }, //lee uno por dia
        svuy: { type: Boolean, required: true, default: false }, //termina en una semana
        jodsi: { type: Boolean, required: true, default: false }, //termina en un mes
        shefer: { type: Boolean, required: true, default: false }, //termina en 5 dias
        allSheferThogether: {
            type: Boolean,
            required: true,
            default: false,
        }, //terminan todos juntos(no iporta cuanto emmore)
    },
    alertas: {
        domingo: {
            fecha: {
                type: Date,
                required: true,
                default: new Date(2000, 2, 15, 8, 0, 0),
            },
            quiere: { type: Boolean, required: true, default: true },
        },
        lunes: {
            fecha: {
                type: Date,
                required: true,
                default: new Date(2000, 2, 15, 8, 0, 0),
            },
            quiere: { type: Boolean, required: true, default: true },
        },
        martes: {
            fecha: {
                type: Date,
                required: true,
                default: new Date(2000, 2, 15, 8, 0, 0),
            },
            quiere: { type: Boolean, required: true, default: true },
        },
        miercoles: {
            fecha: {
                type: Date,
                required: true,
                default: new Date(2000, 2, 15, 8, 0, 0),
            },
            quiere: { type: Boolean, required: true, default: true },
        },
        jueves: {
            fecha: {
                type: Date,
                required: true,
                default: new Date(2000, 2, 15, 8, 0, 0),
            },
            quiere: { type: Boolean, required: true, default: true },
        },
        viernes: {
            fecha: {
                type: Date,
                required: true,
                default: new Date(2000, 2, 15, 8, 0, 0),
            },
            quiere: { type: Boolean, required: true, default: true },
        },
        sabado: {
            fecha: {
                type: Date,
                required: true,
                default: new Date(2000, 2, 15, 8, 0, 0),
            },
            quiere: { type: Boolean, required: true, default: true },
        },
    },
    estudio: {
        type: Schema.Types.Mixed,
        default: function () {
            const obj = {};
            for (let i = 0; i < 150; i++) {
                obj[i] = 0;
            }
            return obj;
        },
    },
});

const userInfo = mongoose.model('usuario', usuario);
//usuario es el nombre que le pongo dentro de mongoose
//usuario es el nombre que le pongo
module.exports = userInfo; //lo exporto
