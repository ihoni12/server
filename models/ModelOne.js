const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const modeloNoJson = {
    name: { type: String, required: true },
    type: { type: String },
    date: { type: Date, required: true },
    perek: { type: Schema.Types.Mixed, required: true, default: [] }, // Array de cualquier tipo
    count: { type: Number, default: 1 },
    lugar: { type: Number, default: 1, require: true },
    avisa: { type: Boolean, require: true, default: false },
    avisaTime: { type: Date, require: true },
    existe: { type: Boolean, required: true, default: true },
};
const oneModel = new Schema(modeloNoJson);

// Usamos el esquema 'todoSchema' para crear el modelo 'todo'
const modeloInf = mongoose.model('One', oneModel);

module.exports = { modeloInf, modeloNoJson };
