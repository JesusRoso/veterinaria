const mongoose = require('mongoose');
const router = require('../router/RutasWeb');
const Schema = mongoose.Schema;

const tiendaSchema = new Schema({
    nombre:String,
    descripcion:String,
    direccion:String,
    contacto:String
});

const tienda = mongoose.model('Tienda',tiendaSchema);


module.exports=tienda;