const express = require('express');
const bodyParser = require('body-parser');

const rentalRoutes = require('./routes/rentals.js');
const usersRoutes = require('./routes/users.js');

const mongoose = require('mongoose');

const config = require('./config/dev');

const {onlyAuthUser}= require('./controllers/users');
const { provideErrorHandler } = require('./middlewares');

require('./models/rentals');
require('./models/user');

mongoose.connect(config.DB_URI ,{
 useNewUrlParser : true,
 useUnifiedTopology : true,
 useCreateIndex: true
}, () =>{
	console.log('DB Connected')
});

const app = express();




// MiddleWare
app.use(bodyParser.json());
app.use(provideErrorHandler);


// following middleware if want to apply globally.

/*app.use((req,res,next) =>{
  const isError=false;
 console.log('Hello World !');

 if(!isError){
   req.someProp ='Hello World 2 !'
    return next();
}

 return res.status(422).send('we got error');

})*/

// following middleware if want to apply locally to single route.

/*const middleware = (req,res,next) =>{
  const isError=false;
 console.log('Hello World !');

 if(!isError){
   req.someProp ='Hello World 2 !'
    return next();
}

 return res.status(422).send('we got error');

}*/

// Api Routes

// app.use('/api/v1/rentals',middleware,rentalRoutes);       // apply middleware to single route


app.get('/api/v1/secret',onlyAuthUser,(req,res)=>{
           
   const user = res.locals.user;
 return res.json({message:`Super secret messages to : ${user.username}`})
})

app.use('/api/v1/rentals',rentalRoutes);
app.use('/api/v1/users',usersRoutes);


const PORT = process.env.PORT || 3001;

app.listen(3001,function(){

	console.log('i am running');
});