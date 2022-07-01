const express = require('express');
const router = express.Router();

router.get("/",(req, res)=>{
    res.render("index",{titulo : "Jesús David Roso Flórez"})
})

module.exports=router;
