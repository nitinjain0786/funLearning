

   const User = require('../models/user');
   const jwt = require('jsonwebtoken');
   const config = require('../config/dev');
   
    exports.login = (req,res) => {

     const { email,password } = req.body;

             if(!password || !email){
        
                return res.sendApiError({title: 'Missing Data',detail: 'Email or Password is missing!'});
              }

   
       User.findOne({email},(error,foundUser)=>{

               if(error){

             return res.mongoError(error);
               }
       
               if(!foundUser){

               	return res.sendApiError({title: 'Invalid Email',detail: 'User doesnot exist !'});

             // return res.status(422).send({ errors: [{ title: 'Invalid Email', detail: ' User doesnot exist !'}]});
               }

               if(foundUser.hasSamePassword(password)){

               	const token = jwt.sign({
   
                    sub: foundUser.id,
                    username: foundUser.username},config.JWT_SECRET,{expiresIn:'2h'})

                  return res.json(token);

               }else{

               	return res.sendApiError({title: 'Invalid Password',detail: 'User doesnot exist !'});


               //	return res.status(422).send({ errors: [{ title: 'Invalid Password', detail: ' User doesnot exist !'}]});
               }

       })


 }


    exports.register = (req,res) => {

    	const { username,email,password,passwordConfirmation } = req.body;

             if(!password || !email){

         return res.sendApiError({title: 'Missing Data',detail: 'Email or Password is missing!'});

              }

              if(password !== passwordConfirmation){

            return res.sendApiError({title: 'Invalid Password',detail: 'Passwords not matching!'});

              }


     User.findOne({email : email}, (error,existingUser) => {

       if(error){
    
      return res.mongoError(error);

       }

       if(existingUser){

       	return res.sendApiError({title: 'Invalid Email',detail: 'User already exist!'});
    
       }

       const user = new User({username,email,password});

       user.save((error)=>{
          
          if(error){
         return res.mongoError(error);
              }

                return res.json({status: 'User Registered!'});
       })


     })

    }


    exports.onlyAuthUser = (req,res,next) =>{

      const token= req.headers.authorization;

       if(token){
           const { decodedToken,error } = parseToken(token);

           if(error){
            return res.status(422).send({ errors: [{ title: 'DB Error', detail: ' Token is malformed !'}]});

           }

           User.findById(decodedToken.sub,(error,foundUser)=>{

              if(error){
         return res.status(422).send({ errors: [{ title: 'DB Error', detail: ' Ooops! Something gone wrong !'}]});
              }

              if(foundUser) {
                 // console.log('foundUser',foundUser);
                   res.locals.user=foundUser;
                   next();
              }else{
                   return notAuthorized(res);
 }


           })

       }else{

          return notAuthorized(res);

       }


    }


      function parseToken(token){

      	try{
             const decodedToken= jwt.verify(token.split(' ')[1],config.JWT_SECRET);
             return { decodedToken }
      	}catch(error){

              return {error: error.message};
      	}

     

       }


     function notAuthorized(res){

     return res.status(401).send({ errors: [{title: 'Not Authorized!!', detail: 'Authorized user can access!!'}]});

     }