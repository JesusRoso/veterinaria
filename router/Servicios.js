const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const servicio = require('../models/servicios');

router.get('/', async (req, res)=>{
    try
    {
        const arrayServicios = await servicio.find();
        res.render("servicios",{listaServicios:"Aquí irán todos los servicios",arrayServicios})
    }
    catch(error)
    {
        console.log(error)
    } 
})

router.get('/crearServicios',(req,res)=>{
    res.render('crearServicios');
});

router.post('/', async (req,res)=>{
    const body = req.body
    console.log(body);
    try{
        await servicio.create(body);
        res.redirect('/servicios');
    }catch(error){
        console.log('error',error);
    }
})

router.get('/:id',async(req,res)=>{
    const id = req.params.id
    try
    {
        const servicioBD = await servicio.findOne({_id: id})
        console.log(servicioBD);
        res.render('detalleServicio',{
            servicio: servicioBD,
            error: false
        });
    } 
    catch(error)
    {
        console.log("error: ", error);
        res.render('detalleServicio',{
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
        const servicioBD = await servicio.findByIdAndDelete({_id: id});
        console.log(servicioBD);
        if(!servicioBD)
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
        const servicioDB = await servicio.findByIdAndUpdate(
            id, body, {useFindAndModify: false}
        )
        console.log(servicioDB);
        res.json({
            estado: true,
            mensaje: 'Servicio editado'
        });
    }
    catch(error)
    {
        console.log(error);
        res.json({
            estado: false,
            mensaje: 'Servicio fallada'
        });
    }
});
module.exports= router;