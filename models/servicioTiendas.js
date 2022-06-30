const mongoose = require('mongoose');
const router = require('../router/RutasWeb');
const Schema = mongoose.Schema;

const servicioTiendasSchema = new Schema({
    id_tienda:String,
    id_servicio:String
});

const ServicioTiendas = mongoose.model('ServicioTiendas',servicioTiendasSchema);


module.exports=ServicioTiendas;