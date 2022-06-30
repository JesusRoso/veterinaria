var express = require('express');
var app = express();

const passport = require("passport");
const cookieParser =  require("cookie-parser");
const session =  require('express-session');
const PassportLocal = require('passport-local').Strategy;

//variables de entorno
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));

app.use(cookieParser('mi secreto'));
app.use(session({
    secret: 'mi secreto',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const registros = require('./models/registros');
var nombre = "";
passport.use(new PassportLocal(async function(username, password, done){
    const arrayregistros = await registros.find();
    var correo = [];
    var clave = [];
    var nombres = [];
    arrayregistros.forEach(element => {
        correo.push(element.correo);
        clave.push(element.clave);
        nombres.push(element.nombres);
    });
    for (let i = 0; i < correo.length; i++) {
      if(username === correo[i] && password === clave[i]){
        nombre = nombres[i];
        return done(null,{id:i, name: nombres});  
      }
    }
    done(null, false);   
}));
passport.serializeUser(function(user,done){
  done(null, user.id);
})

//deserializacion
passport.deserializeUser(function(id, done){
  done(null, {id:1, name: "jesus"})
})

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname+"/public"))

app.use(express.static(__dirname+"/public"))

app.get("/", (req,res,next)=>{
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
} ,(req, res)=>{
  res.render("index",{nombre});
});

app.get("/login",(req, res)=>{
  res.render("login");
});
app.post("/login", passport.authenticate('local',{
  successRedirect: "/",
  failureRedirect: "/login"
}));

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
app.use('/paginaPrincipal',require('./router/PaginaPrincipal'));
app.use('/registro',require('./router/Registros'));


app.use((req, res, next)=>{
  res.status(404).render("404",{
    titulo: "404",
    descripcion: "Titulo de la web"
  })
})
app.listen(port, ()=>{
    console.log("Escuchando express "+port);
})