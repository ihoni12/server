// index.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tfilaSchema = new Schema({
    tipo: { type: Number, required: true }, //que tfila
    day: { type: Number, required: true }, //que dia de la semana
    type: { type: Number, required: true }, //tipo , que empieza; nech,hora,....
    time: { type: Date, required: true }, //hora metida
    start: { type: Number, required: true }, //de donde empiezan
    repite: { type: Boolean, required: true }, //repetido
    tiempoSale: { type: Date, required: false }, //tiempo de salida
    numeroTransporte: { type: String }, //numero de el transporte
    paradaFinal: { type: String }, //parada final
    nota: { type: String }, //notas
    positivos: { type: Number, required: true },
    negativos: { type: Number, required: true },
    idCreador: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now, required: true },
});

const tfilotModel = new Schema({
    ubicacion: {
        alt: { type: Number, required: true },
        lon: { type: Number, required: true },
    },
    tfila: [tfilaSchema],
    transporte: { type: Boolean, default: false, required: true }, //si es transporte o no
    IDdueno: { type: String, required: true },
    fecha: { type: Date, default: Date.now, required: true },
});

const modeloTfila = mongoose.model('mikum', tfilotModel);

module.exports = {
    tfilaSchema,
    tfilotModel,
    modeloTfila,
};
