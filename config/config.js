//import { url } from "inspector";

//===============
// PUERTO
//==============

process.env.PORT = process.env.PORT || 3000;


//===============
// ENTORNO
//==============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


//CADUCIDAD_TOKEN
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || 60*60*60*24*7;


//===============
// DB
//==============

 let urlDB = "";
//
// if (process.env.NODE_ENV == "dev") {
//     urlDB = 'mongodb://localhost:27017/cafe';
// } else {
     urlDB = 'mongodb://adminuser:epicdevs2018@ds149960.mlab.com:49960/graderdb';
// }
//
 process.env.urlDB = urlDB;
