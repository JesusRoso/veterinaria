const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const propietario = require('../models/propietarios');
const mascotas = require('../models/mascotas');

router.get('/', async (req, res)=>{
    try
    {
        const arrayMascotas = await mascotas.find();
        const arrayPropietarios = await propietario.find();
        res.render("propietarios",{listaMascotas:"Aquí irán todos propietarios",arrayPropietarios,arrayMascotas})
    }
    catch(error)
    {
        console.log(error)
    } 
})

router.get('/crearPropietario',(req,res)=>{
    res.render('crearPropietario');
});

router.post('/', async (req,res)=>{
    const body = req.body
    console.log(body);
    try{
        await propietario.create(body);
        res.redirect('/propietarios');
    }catch(error){
        console.log('error',error);
    }
})

router.get('/:id',async(req,res)=>{
    const id = req.params.id
    try
    {
        const propietarioBD = await propietario.findOne({_id: id})
        res.render('detallePropietario',{
            propietario: propietarioBD,
            error: false
        });
    } 
    catch(error)
    {
        console.log("error: ", error);
        res.render('detallePropietario',{
            error: true,
            mensaje: "No se encuentra el documento"
        });
    }
});
router.get('/:id/verMascotas',async(req,res)=>{
    const propietarioMascotas = require('../models/propietarioMascotas');
    const id = req.params.id
    try
    {
        const propietarioMascotasBD = await propietarioMascotas.find({id_propietario: id}).exec();
        const arraymascotaDB = await mascotas.find();
        res.render('verMascotas',{
            propietarioMascota: propietarioMascotasBD,
            arraymascotaDB,
            error: false
        });
    } 
    catch(error)
    {
        console.log("error: ", error);
        res.render('verMascotas',{
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
        const propietarioBD = await propietario.findByIdAndDelete({_id: id});
        // console.log(propietarioBD);
        if(!propietarioBD)
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
    // console.log(id);
    // console.log('body', body);
    try
    {
        const propietarioDB = await propietario.findByIdAndUpdate(
            id, body, {useFindAndModify: false}
        )
        console.log(propietarioDB);
        res.json({
            estado: true,
            mensaje: 'Propietario editado'
        });
    }
    catch(error)
    {
        console.log(error);
        res.json({
            estado: false,
            mensaje: 'Propietario fallado'
        });
    }
});
module.exports= router;