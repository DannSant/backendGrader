const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let questionSchema = new Schema({
  desc:{
    type:String,
    required:[true,'La descripcion es obligatoria']
  },
  orderCode:{
    type:Number,
    required:[true,'El codigo de ordenamiento es obligatorio']
  },
  type:{
    type:Number,
    required:[true,'El tipo es obligatorio']
  },
  answers:
    [String]
  ,
  correctAnswerIdx:{
    type:Number,
    required:[true,'La respuesta correcta es obligatoria']
  },
  keywords:
    [String]

});

let examSchema = new Schema({
  name:{
    type:String,
    required:[true,'El nombre es obligatorio']
  },
  desc:{
    type:String
  },
  author: {
    type:String
  },
  viewer: {
      type:String
  },
  questions:
    [questionSchema]
  ,
  shuffle:{
    type:Boolean,
    default:false
  },
  url:{
    type:String
  },
  creationDate:{
    type:Date,
  },
  lastModifiedDate:{
    type:Date,
    default: Date.now
  },
  status:{
    type:Boolean,
    default:true
  }
});

module.exports = mongoose.model("Exam", examSchema);
