

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentalSchema = new Schema({

     title: {type : String , required : true , maxlength :[500 ,'Invalid Length']},
   city:{type : String , required : true , lowercase : true},
   street : {type : String , required : true  , minlength :[4 ,'Invalid Length'], lowercase : true},
   category : {type : String , required : true , lowercase : true},
   image: {type : String , required : true },
   bedrooms : {type : Number, required : true },
   description : {type : String , required : true },
   dailyRate: {type : Number, required : true },
   shared :Boolean,
   createAt : {type :Date , default : Date.now}
  
})

// Available on instance

/*rentalSchema.methods.sendError = function(res,config){

	const {status,detail} = config;

   return res.status(status).send({errors :[{title : 'Rental Error!' , message :detail }]});

}*/


rentalSchema.statics.sendError = function(res,config){

	const {status,detail} = config;

   return res.status(status).send({errors :[{title : 'Rental Error!' , message :detail }]});

}


module.exports = mongoose.model('Rental',rentalSchema);