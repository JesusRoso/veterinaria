const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const propietario = require('../models/propietarios');
const mascotas = require('../models/mascotas');
const propietarioMascotas = require('../models/propietarioMascotas');

router.get('/', async (req, res)=>{
    try
    {
        const arrayMascotas = await mascotas.find();
        const arrayPropietarios = await propietario.find();
        res.render("propietarioMascota",{listaPropietarioMascotas:"Aquí irán todos propietarios",arrayPropietarios,arrayMascotas})
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
        await propietarioMascotas.create(body);
        res.redirect('/propietarioMascota');
    }catch(error){
        console.log('error',error);
    }
})

module.exports= router;