const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const tienda = require('../models/tienda');
const servicio = require('../models/servicios');

router.get('/', async (req, res)=>{
    try
    {
        const arrayTiendas = await tienda.find();
        res.render("tienda",{listaTiendas:"Aquí irán todas las tiendas",arrayTiendas})
    }
    catch(error)
    {
        console.log(error)
    } 
})

router.get('/crearTienda',(req,res)=>{
    res.render('crearTienda');
});
router.get('/servicios',(req,res)=>{
    res.render('servicios');
});

router.post('/', async (req,res)=>{
    const body = req.body
    console.log(body);
    try{
        await tienda.create(body);
        res.redirect('/tienda');
    }catch(error){
        console.log('error',error);
    }
})

router.get('/:id',async(req,res)=>{
    const id = req.params.id
    try
    {
        const tiendaBD = await tienda.findOne({_id: id})
        console.log(tiendaBD);
        res.render('detalleTienda',{
            tienda: tiendaBD,
            error: false
        });
    } 
    catch(error)
    {
        console.log("error: ", error);
        res.render('detalleTienda',{
            error: true,
            mensaje: "No se encuentra el documento"
        });
    }
});
router.get('/:id/servicios',async(req,res)=>{
    const id = req.params.id
    try
    {
        const tiendaBD = await tienda.findOne({_id: id})
        console.log(tiendaBD);
        res.render('servicios',{
            tienda: tiendaBD,
            error: false
        });
    } 
    catch(error)
    {
        console.log("error: ", error);
        res.render('servicios',{
            error: true,
            mensaje: "No se encuentra el documento"
        });
    }
});
router.get('/:id/verServicios',async(req,res)=>{
    const servicioTiendas = require('../models/servicioTiendas');
    const id = req.params.id
    try
    {
        const servicioTiendasBD = await servicioTiendas.find({id_tienda: id}).exec();
        const arrayServicioDB = await servicio.find();
        res.render('verServicios',{
            servicioTienda: servicioTiendasBD,
            arrayServicioDB,
            error: false
        });
    } 
    catch(error)
    {
        console.log("error: ", error);
        res.render('verServicios',{
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
        const tiendaBD = await tienda.findByIdAndDelete({_id: id});
        console.log(tiendaBD);
        if(!tiendaBD)
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
        const tiendaDB = await tienda.findByIdAndUpdate(
            id, body, {useFindAndModify: false}
        )
        console.log(tiendaDB);
        res.json({
            estado: true,
            mensaje: 'Tienda editada'
        });
    }
    catch(error)
    {
        console.log(error);
        res.json({
            estado: false,
            mensaje: 'Tienda fallada'
        });
    }
});
module.exports= router;