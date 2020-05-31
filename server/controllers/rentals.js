

  const Rental = require('../models/rentals');





exports.getRentals = (req,res)=>{
  //console.log('get middleare'+req.someProp);
	Rental.find({},(err,foundRentals)=>{
  
      if(err){
     return res.mongoError(err);
      
      	//return Rental.sendError(res,{status : 422 ,detail : 'Cannot retreive rental data !'});
      }

         return res.json(foundRentals);
	});

}

exports.getRentalById = (req,res)=>{
  
   const rental = req.params.rentalId;

   Rental.findById(rental, (err,foundRental)=>{

  if(err){

      
      	 return res.mongoError(err);
      }
   
    res.json(foundRental);
   });
 
	

}


exports.createRental = (req,res)=>{
   
    const rentalData = req.body; 
   
   /* const newRental = new Rental(rentalData);
  
     
     newRental.save((error,createdRental) =>{
    
    if(error){

      	return res.status(422).send({errors :[{ title : 'Rental Error !' , message :'Rental Not Saved' }]})
      }

       return res.json({message : `Rental with id : ${createdRental._id} was added.`});

     });*/



     Rental.create(rentalData,(error,createdRental)=>{

      if(error){

      	//return res.status(422).send({errors :[{ title : 'Rental Error !' , message :'Rental Not Saved' }]});

      	 return res.mongoError(error);
      }

       return res.json({message : `Rental with id : ${createdRental._id} was added.`});


     })

    

}

/*exports.deleteRental = (req,res)=>{

const {id} = req.params;

   const rIndex = rentals.findIndex(r => r._id === id);

   rentals.splice(rIndex,1);

       return res.json({message : `Rental with id : ${id} was removed.`});
}


exports.updateRental = (req,res)=>{

const {id} = req.params;

  const rentalToUpdate = req.body;

   const rIndex = rentals.findIndex(r => r._id === id);

   rentals[rIndex].city = rentalToUpdate.city;
   rentals[rIndex].title = rentalToUpdate.title;


       return res.json({message : `Rental with id : ${id} was updated.`});
}*/


