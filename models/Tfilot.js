// index.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diaSchema = new Schema({
    day: { type: Number, required: true },
    type: { type: Number, required: true },
    time: { type: Date, required: true },
});

const tfilaSchema = new Schema({
    tipo: { type: Number, required: true },
    dia: [diaSchema],
    repite: { type: Boolean, required: true },
    positivos: { type: Number, required: true },
    denuncias: { type: Number, required: true },
    idCreador: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
});

const tfilotModel = new Schema({
    ubicacion: {
        alt: { type: Number, required: true },
        lon: { type: Number, required: true },
    },
    tfila: [tfilaSchema],
});

const modeloTfila = mongoose.model('Tfilot', tfilotModel);

module.exports = {
    diaSchema,
    tfilaSchema,
    tfilotModel,
    modeloTfila,
};
