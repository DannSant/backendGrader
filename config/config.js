//import { url } from "inspector";

//===============
// PUERTO
//==============

process.env.PORT = process.env.PORT || 3000;


//===============
// ENTORNO
//==============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


//===============
// DB
//==============

// let urlDB = "";
//
// if (process.env.NODE_ENV == "dev") {
//     urlDB = 'mongodb://localhost:27017/cafe';
// } else {
//     urlDB = 'mongodb://cafe-user:a123456@ds147890.mlab.com:47890/cafe';
// }
//
// process.env.urlDB = urlDB;
