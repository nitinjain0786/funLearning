const mongoose = require('mongoose');

const config = require('../config/dev');

const FakeDB = require('./fakeDB.js');




mongoose.connect(config.DB_URI ,{
 useNewUrlParser : true,
 useUnifiedTopology : true,
 useCreateIndex: true
}, async() =>{
       
    const fakeDB = new FakeDB();
	console.log('Starting Populating DB');

	await fakeDB.populate();
    await mongoose.connection.close();

    console.log('DB has been populated');


});


