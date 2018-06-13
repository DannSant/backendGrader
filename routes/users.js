const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Usuario = require('../models/user')
const { verificaToken, verificaAdmin } = require('../middleware/auth')


//===========================
//Peticiones GET
//===========================
app.get('/user', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ status: true })
        .skip(desde)
        .limit(limite)
        .exec((error, usuarios) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    error
                })
            }

            Usuario.count({ status: true }, (e, conteo) => {
                res.json({
                    ok: true,
                    records: conteo,
                    usuarios
                })
            })
        })
})

//===========================
//Peticiones POST
//===========================
app.post('/user', [verificaToken, verificaAdmin], (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol
    });

    usuario.save((error, usuarioDB) => {

        if (error) {
            return res.status(400).json({
                ok: false,
                error
            })
        }
        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    });

})

//===========================
//Peticiones PUT
//===========================
app.put('/user/:id', [verificaToken, verificaAdmin], function(req, res) {
    let code = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'status', 'rol']);
    //console.log(body);

    Usuario.findByIdAndUpdate(code, body, { new: true, runValidators: true }, (error, usuarioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "No se encontró al usuario a actualizar"
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
})

//===========================
//Peticiones POST(DELETE)
//===========================
app.post('/user/:id', [verificaToken, verificaAdmin], function(req, res) {
    let id = req.params.id;

    let body = _.pick(req.body, ['status']);

    body.status = false


    Usuario.findByIdAndUpdate(id, body, { new: true }, (error, usuarioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "No se encontró al usuario a borrar"
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});


/*
var admin = require('firebase-admin');

var serviceAccount = require('../accountKey.json');

let users = [];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://grader-14d39.firebaseio.com'
});
//const Usuario = require('../models/usuario')


app.get('/users', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 1000;
    limite = Number(limite);
    users = [];
    listAllUsers(undefined,()=>{
      //console.log(users);
      //console.log(users.length);
      res.json({
        ok:true,
        data:users,
        records: users.length
      })
    },(e)=>{
      res.status(400).json({
        ok:false,
        data:null,
        records:0,
        error:{errorMsg:"Ocurrio un error al obtener los usuarios",errorDesc:e}
      })
    });



});




let listAllUsers =(pageToken,onSuccess,onError)=>{
  admin.auth().listUsers(1000, pageToken)
      .then(function(listUsersResult) {
        listUsersResult.users.forEach(function(userRecord) {
          users.push(userRecord);
          //console.log(listUsersResult.pageToken)
          //console.log("user", userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken,onSuccess,onError)
        }else {
          onSuccess();
        }
      })
      .catch(function(error) {
        //console.log("Error listing users:", error);
        onError(error);
  });
}
*/

module.exports = app;
