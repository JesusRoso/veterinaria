const mongoose = require('mongoose');
const router = require('../router/RutasWeb');
const Schema = mongoose.Schema;

const propietarioSchema = new Schema({
    nombre:String,
    apellido:String,
    documento:String,
    edad:String,
    contacto:String
});

const propietario = mongoose.model('Propietarios',propietarioSchema);


module.exports=propietario;