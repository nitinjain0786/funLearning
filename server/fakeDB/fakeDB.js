

const {rentals,users} = require('./data/index');
const Rental = require('../models/rentals');
const User = require('../models/user');

class FakeDB{



    async clean(){

       await Rental.deleteMany({});
       await User.deleteMany({});

     }

    async addData(){

      await  Rental.create(rentals);

      await  User.create(users);
     }


        async populate(){

        await this.clean();

        await this.addData();

        }

}



module.exports = FakeDB;