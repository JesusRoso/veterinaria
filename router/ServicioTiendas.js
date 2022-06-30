const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const tienda = require('../models/tienda');
const servicio = require('../models/servicios');
const servicioTienda = require('../models/servicioTiendas');

router.get('/', async (req, res)=>{
    try
    {
        const arrayTiendas = await tienda.find();
        const arrayServicios = await servicio.find();
        res.render("servicioTienda",{listaServicioTiendas:"Aquí irán serviciosTienda",arrayTiendas,arrayServicios})
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
        await servicioTienda.create(body);
        res.redirect('/servicioTienda');
    }catch(error){
        console.log('error',error);
    }
})
module.exports= router;