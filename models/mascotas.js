const mongoose = require('mongoose');
const router = require('../router/RutasWeb');
const Schema = mongoose.Schema;

const mascotaSchema = new Schema({
    nombre:String,
    descripcion:String,
});

const mascota = mongoose.model('Mascota',mascotaSchema);


module.exports=mascota;