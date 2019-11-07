var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')


var app = express();


// CORS

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Importar Rutas
var appRoutes = require('./routes/app');
var LoginRoutes = require('./routes/login');
var UsuarioRoutes = require('./routes/usuario');



//Conexion a la BD

mongoose.connection.openUri('mongodb://localhost:27017/inventarioDB', (err, res)=>{
 
if(err) throw err;
console.log('Base de datos: \x1b[32m%s\x1b[0m ',' online')
});

app.get('/', (req, res, next)=> {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
      
    });
   
});

// Rutas


app.use('/login', LoginRoutes);
app.use('/usuario', UsuarioRoutes);
app.use('/', appRoutes);


app.listen(3000, ()=>{
    console.log('Express serve puerto 3000: \x1b[32m%s\x1b[0m ',' online')
    })
  
  
