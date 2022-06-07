const mongoose = require('mongoose');
const router = require('../router/RutasWeb');
const Schema = mongoose.Schema;

const propietarioMascotasSchema = new Schema({
    id_mascota:String,
    id_propietario:String
});

const propietarioMascota = mongoose.model('PropietarioMascotas',propietarioMascotasSchema);


module.exports=propietarioMascota;