var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')


var app = express();


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

app.listen(3000, ()=>{
    console.log('Express serve puerto 3000: \x1b[32m%s\x1b[0m ',' online')
    })
  
  
