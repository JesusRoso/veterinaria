// var cowsay = require("cowsay");

// console.log(

//     cowsay.say(
//         {
//             text: "Soy un modulo",
//             e: "Oo",
//             T: "U"
//         }
//     )
// );


//comunicacion con el servidor
// const http = require("http");
// const server = http.createServer((req, res)=>{
//     console.log("Respuesta del servidor");
//     res.end("Te envío un saludo");
// });

// const puerto = 3000
// server.listen(puerto, ()=>{
//     console.log("Escuchando");
// })

var navBar = `
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="contacto">Contacto</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

`

var express = require('express')
var app = express();
const puerto = process.env.puerto || 3000

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get('/', function(req, res) {
    // res.send
    // (`
    //   <div>
    //     <p><strong>Esta sección es la página de inicio</strong></p>
    //   </div>
    // `  
    // );
    res.render("index",{titulo: "Jesus"})
  });
 
app.get("/nosotros",(req,res)=>{
  // res.send
  // (`
  //  <div>
  //   <p>Esta es la sección de ruta</p>
  //  </div>`
  // );
  res.render("index", {titulo: "Nosotros EJS"});
})
app.use(express.static(__dirname+"/public"))

app.use((req, res, next)=>{
  // res.status(404).sendFile(__dirname+"/public/404.html");
  res.status(404).render("404",{titulo: "Pagina 404"});
})


app.listen(puerto, ()=>{
    console.log("Escuchando express");
})