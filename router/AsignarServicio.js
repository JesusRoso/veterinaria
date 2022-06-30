const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const servicioTienda = require('../models/servicioTiendas');
const propietarioMascotas = require('../models/propietarioMascotas');
const asignarServicios = require('../models/asignarServicios');
const mascotas = require('../models/mascotas');
const servicio = require('../models/servicios');
const tienda = require('../models/tienda');
<<<<<<< HEAD
const propietario = require('../models/propietarios');
=======
>>>>>>> a7ff6e8d5d5feaad1f725ea1eeb6fb4e26e80db7

router.get('/', async (req, res)=>{
    try
    {
        const arrayPropietarioMascotas = await propietarioMascotas.find();
        const arrayServicioTiendas = await servicioTienda.find();
        const arrayAsignarServicio = await asignarServicios.find();
        const arrayMascota = await mascotas.find();
        const arrayServicio = await servicio.find();
        const arrayTienda = await tienda.find();
<<<<<<< HEAD
        const arrayPropietario = await propietario.find();
        const arreglos = [];
        arrayServicioTiendas.forEach(elem=>{
            arreglos.push(elem.id_tienda)
        })
        
        
        res.render("asignarServicio",{listaAsignarServicios:"Aquí irán coasas",
        arrayPropietarioMascotas,arrayServicioTiendas,arrayMascota,arrayServicio,
        arrayAsignarServicio,arrayTienda,arrayPropietario,arreglo:arreglos})
=======
        
        res.render("asignarServicio",{listaAsignarServicios:"Aquí irán coasas",
        arrayPropietarioMascotas,arrayServicioTiendas,arrayMascota,arrayServicio,
        arrayAsignarServicio,arrayTienda})
>>>>>>> a7ff6e8d5d5feaad1f725ea1eeb6fb4e26e80db7
    }
    catch(error)
    {
        console.log(error)
    } 
})

router.post('/', async (req,res)=>{
    const body = req.body
    console.log(body);
    try{
        await asignarServicios.create(body);
        res.redirect('/asignarServicio');
    }catch(error){
        console.log('error',error);
    }
})

module.exports= router;