const express = require('express');
const router = express.Router();

router.get("/",(req, res)=>{
    res.render("paginaPrincipal",{titulo : "Jesús David Roso Flórez"})
})
module.exports=router;