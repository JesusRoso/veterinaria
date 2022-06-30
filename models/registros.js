const mongoose = require('mongoose');
const router = require('../router/RutasWeb');
const Schema = mongoose.Schema;

const registroSchema = new Schema({
    nombres:String,
    apellidos:String,
    documento:String,
    telefono:String,
    correo:String,
    clave:String
});

const registro = mongoose.model('Registros',registroSchema);


module.exports=registro;