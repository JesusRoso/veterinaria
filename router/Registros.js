const express = require('express');
const router = express.Router();
const res = require('express/lib/response');

const registro = require('../models/registros');

router.get('/', async (req, res)=>{
    try
    {
        const arrayRegistros = await registro.find();
        res.render("registro",{listaMascotas:"Aquí irán los registrados",arrayRegistros})
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
        await registro.create(body);
        res.redirect('/');
    }catch(error){
        console.log('error',error);
    }
})

module.exports= router;