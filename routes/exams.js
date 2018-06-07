const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const Exam = require('../models/exam')

//===========================
//Peticiones GET
//===========================
app.get('/exam', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 20;
    limite = Number(limite);

    let queryType = req.query.queryType || 1;
    queryType = Number(queryType);

    let filter= {};

    //Tipo 1 - listar todos los examenes activos
    if(queryType==1){
      filter={ status: true }
    }

    //Tipo 2 - listar todos los examenes activos de un usuario
    if(queryType==2){
      let user= req.query.uid;
      if(!user){
        return res.status(400).json({
          ok:false,
          data:null,
          records:0,
          error:{errorMsg:"Se recibió una peticion para obtener un listado de un usuario, pero no se recibio nada en el campo uid",errorDesc:""}
        })
      }
      filter={ status: true,author:user }
    }

    Exam.find(filter)
        .skip(desde)
        .limit(limite)
        .exec((error, exams) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    data:null,
                    records:0,
                    error
                })
            }

            Exam.count(filter, (e, conteo) => {
                res.json({
                    ok: true,
                    records: conteo,
                    data:exams
                })
            });
        });
});

app.get('/exam/:id', function(req, res) {
    let code = req.params.id;

    Exam.findOne({_id:code})
        .exec((error, examDB) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    data:null,
                    error
                })
            }

            res.json({
                ok: true,
                data:examDB
            })
        });
});

//===========================
//Peticiones POST
//===========================
app.post('/exam', function(req, res) {
  let body = req.body;
  //console.log(req);
  let exam = new Exam({
        name: body.name,
        desc: body.desc,
        author: body.author,
        viewer: body.viewer,
        questions:body.questions,
        shuffle:body.shuffle,
        url:body.url,
        creationDate:body.creationDate,
        lastModifiedDate:body.lastModifiedDate
    });

  exam.save((error, examDB) => {

        if (error) {
            return res.status(500).json({
                ok: false,
                data:null,
                records:0,
                error
            })
        }
        res.json({
            ok: true,
            data: examDB
        });
      });
  });

//===========================
//Peticiones PUT
//===========================
app.put('/exam/:id', function(req, res) {
    let code = req.params.id;
    let body = _.pick(req.body, ['name', 'desc', 'viewer', 'shuffle', 'questions','lastModifiedDate']);
    //console.log(body);

    body.lastModifiedDate = new Date();

    Exam.findByIdAndUpdate(code, body, { new: true, runValidators: true }, (error, examenDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                data:null,
                records:0,
                error
            })
        }

        res.json({
            ok: true,
            data: examenDB
        });

    });
})

//===========================
//Peticiones DELETE
//===========================
app.post('/exam/delete/:id', function(req, res) {
    let id = req.params.id;

    let body = _.pick(req.body, ['status']);

    body.status = false


    Exam.findByIdAndUpdate(id, body, { new: true }, (error, examDB) => {
        if (error) {
            return res.status(500).json({
              ok: false,
              data:null,
              records:0,
              error
            })
        }

        if (!examDB) {
            return res.status(400).json({
              ok: false,
              data:null,
              records:0,
              error:{errorMsg:"No se encontró al examen a borrar",errorDesc:error}
            });
        }

        res.json({
            ok: true,
            data: examDB
        });

    });
});



module.exports = app;
