const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render("mascotas",{listaMascotas:"Aquí irán todas las mascotas"})
})

module.exports= router;

