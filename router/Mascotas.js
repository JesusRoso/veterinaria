const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const mascota = require('../models/mascotas');
const propietario = require('../models/propietarios');

router.get('/', async (req, res)=>{
    try
    {
        const arrayPropietarios = await propietario.find();
        const arrayMascotas = await mascota.find();
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
    try{
        await mascota.create(body);
        res.redirect('/mascotas');
    }catch(error){
        console.log('error',error);
    }
})

router.get('/:id',async(req,res)=>{
    const id = req.params.id
    try
    {
        const mascotaBD = await mascota.findOne({_id: id})
        console.log(mascotaBD);
        res.render('detalle',{
            mascota: mascotaBD,
            error: false
        });
    } 
    catch(error)
    {
        console.log("error: ", error);
        res.render('detalle',{
            error: true,
            mensaje: "No se encuentra el documento"
        });
    }
});
router.delete('/:id', async(req, res)=>{
    const id =req.params.id;
    console.log('id desde backend', id);
    try
    {
        const mascotaBD = await mascota.findByIdAndDelete({_id: id});
        console.log(mascotaBD);
        if(!mascotaBD)
        {
            res.json({
                estado: false,
                mensaje: "No se puede eliminar"
            });
        }
        else
        {
            res.json({
                estado: true,
                mensaje: "Eliminado"
            });
        }
    }
    catch(error)
    {
        console.log(error)
    }
});

router.put('/:id' , async (req, res)=>{
    const id = req.params.id;
    const body = req.body;
    console.log(id);
    console.log('body', body);
    try
    {
        const mascotaDB = await mascota.findByIdAndUpdate(
            id, body, {useFindAndModify: false}
        )
        console.log(mascotaDB);
        res.json({
            estado: true,
            mensaje: 'Mascotas editada'
        });
    }
    catch(error)
    {
        console.log(error);
        res.json({
            estado: false,
            mensaje: 'Mascotas fallada'
        });
    }
});
module.exports= router;

