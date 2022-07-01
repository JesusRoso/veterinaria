const mongoose = require('mongoose');
const router = require('../router/RutasWeb');
const Schema = mongoose.Schema;

const inicioSesionSchema = new Schema({
    correo:String,
    clave:String
});

const inicioSesion = mongoose.model('InicioSesion',inicioSesionSchema);


module.exports=inicioSesion;