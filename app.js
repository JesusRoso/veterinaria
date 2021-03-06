var express = require('express');
var app = express();
//variables de entorno
require('dotenv').config();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname+"/public"))



//conexión a mongo por medio de mongoose
const mongoose = require('mongoose');
const usuario = process.env.USUARIO;
const password = process.env.PASSWORD
const dbName = process.env.DBNAME;

const uri = `mongodb+srv://${usuario}:${password}@cluster0.dqo3v.mongodb.net/${dbName}?retryWrites=true&w=majority`
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log('conectado a mongodb'))
.catch(e=>console.log('error de conexion', e));



app.use('/',require('./router/RutasWeb'));
app.use('/mascotas',require('./router/Mascotas'));
app.use('/tienda',require('./router/Tiendas'));
app.use('/propietarios',require('./router/Propietarios'));
app.use('/servicios',require('./router/Servicios'));
app.use('/propietarioMascota',require('./router/PropietarioMascotas'));
app.use('/servicioTienda',require('./router/ServicioTiendas'));
app.use('/asignarServicio',require('./router/AsignarServicio'));


app.use((req, res, next)=>{
  res.status(404).render("404",{
    titulo: "404",
    descripcion: "Titulo de la web"
  })
})
app.listen(port, ()=>{
    console.log("Escuchando express "+port);
})