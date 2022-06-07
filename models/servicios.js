const mongoose = require('mongoose');
const router = require('../router/RutasWeb');
const Schema = mongoose.Schema;

const servicioSchema = new Schema({
    descripcion:String,
    precio:String
});

const servicio = mongoose.model('Servicio',servicioSchema);


module.exports=servicio;