//Requires
require('./config/config.js');
const express = require('express')
const mongoose = require('mongoose');
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');

//Inicio de base de datos
mongoose.connect(process.env.urlDB, (error, response) => {
    if (error) {
        throw error;
    }
    console.log("Base de datos ","online".green);
});

//configure CORS
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

//Rutas
app.use(require('./routes/index'));

//Inicio de server
app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto ", colors.green(process.env.PORT));
});
