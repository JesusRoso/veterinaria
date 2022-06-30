const mongoose = require('mongoose');
const router = require('../router/RutasWeb');
const Schema = mongoose.Schema;

const asignarServicioSchema = new Schema({
    id_mascota_propietario:String,
    id_servicio_tienda:String
});

const asignarServicio = mongoose.model('AsignarServicios',asignarServicioSchema);


module.exports=asignarServicio;