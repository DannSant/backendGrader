const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
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

module.exports = app;


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
