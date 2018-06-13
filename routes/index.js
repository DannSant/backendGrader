const express = require('express')
const app = express()

app.use(require('./exams'));
app.use(require('./users'));
app.use(require('./login'));




module.exports = app;
