require('./config/config.js');
const express = require('express')
const mongoose = require('mongoose');
const app = express()
const bodyParser = require('body-parser')

// mongoose.connect(process.env.urlDB, (error, response) => {
//     if (error) {
//         throw error;
//     }
//     console.log("Base de datos online");
// });


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/users'));


app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto ", process.env.PORT);
});
