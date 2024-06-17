const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    text: [],
});

// Usamos el esquema 'todoSchema' para crear el modelo 'todo'
const todoInf = mongoose.model('todo', todoSchema);

module.exports = todoInf;
