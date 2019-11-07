var express = require('express');
var bcrypt = require('bcryptjs');


var jwt = require('jsonwebtoken');


var app = express();


var Usuario = require('../models/usuario');



var mdAutenticacion = require('../middlewares/autenticacion'); 

///============================================
//      RENOVAR EL TOKEN
///============================================
app.get('/renuevaToken',mdAutenticacion.verificaToken, (req, res) => {
  var token =  jwt.sign({usuario: req.usuario }, SEED,{ expiresIn: 14400}) // 4 horas
 
  res.status(200).json({
    ok: true,
   usuario: req.usuario,
   token: token
});
});


///============================================
//      AUTENTICACION NORMAL 
///============================================
app.post('/', (req, res)=>{

    var body = req.body;

    Usuario.findOne({email: body.email}, (err, usuarioDB)=>{

        if(err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un usuarioDB',
                errors: err
            });
        }
        if(!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email ',
                errors: err
            });
        }
        if(!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incoreectas - passsword ',
                
                errors: err
            });
        }
            
       

     //CREAR TOKEN
        usuarioDB.password = ':)';
     var token =  jwt.sign({usuario: usuarioDB }, SEED,{ expiresIn: 14400}) // 4 horas

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            id: usuarioDB._id,
            token: token,
            menu: obtenerMenu(usuarioDB.role),
            });


    });

})

function obtenerMenu( ROLE ) {

   var menu = [
        {
          titulo: 'Principal',
          icono: 'mdi mdi-gauge',
    
          submenu: [
            {
              titulo: 'Dashboard', url:'/dashboard'
            },
            {
              titulo: 'PogressBar', url:'/progress'
            },
            {
              titulo: 'Graficas', url:'/graficas1'
            },
            {
              titulo: 'Promesas', url:'/promesa'
            },
            {
              titulo: 'Componente rxjs', url:'/rxjs'
            },
    
          ]
        },
        {
          titulo: 'Mantenimientos',
          icono: 'mdi mdi-folder-lock-open',
    
          submenu: [
           /* {
              titulo: 'Usuarios', url:'/usuarios'
            },*/
            {
              titulo: 'Hospitales', url:'/hospitales'
            },
             {
              titulo: 'Medicos', url:'/medicos'
            },
          ]
        }
    
      ];
      
      if (ROLE === 'ADMIN_ROLE') {
          menu[1].submenu.unshift({ titulo: 'Usuarios', url:'/usuarios'});
         
      }
     return menu;

}


module.exports = app