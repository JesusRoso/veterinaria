const express = require('express');
const router = express.Router();

const mascota = require('../models/mascotas');

router.get('/', async (req, res)=>{
    try
    {
        const arrayMascotas = await mascota.find();
        console.log(arrayMascotas);
        res.render("mascotas",{listaMascotas:"Aquí irán todas las mascotas",arrayMascotas})
    }
    catch(error)
    {
        console.log(error)
    }
    
})

router.get('/crear',(req,res)=>{
    res.render('crear');
});
router.post('/', async (req,res)=>{
    const body = req.body
    console.log(body);
    try{
        await mascota.create(body);
        res.redirect('/mascotas');
    }catch(error){
        console.log('error',error);
    }
})
module.exports= router;

