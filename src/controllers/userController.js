const model = require('../models/userModel');
const form = require('../Helper/form');
const jwt = require('jsonwebtoken'); //i cant use it on main(index.js), but in here it will works



module.exports = {



    loginUser:  function(req, res){
        let { email, password } = req.body;
        let body = { email, password}
        // let email_input = req.body.email;
        // let password_input = req.body.password;

        console.log(email);
        // console.log(password_input);
        console.log(body.password);

        model.loginUser(email)
        .then(responseQuery => {
            const id_user = responseQuery[0].id_user
            const role = responseQuery[0].role
            const password_db = responseQuery[0].password; //use array index 0 or anything, cause this response type is array
            
            const compareresult = body.password.localeCompare(password_db); //comparing password_input and password in database 
            if ( compareresult == 0) { //zero mean has same value
                
                //jwt.sign({ username: email, password: password_db }, process.env.JWT_PRIVATE_KEY, {expiresIn: '120s'} /* expire */, function(err, token) {
                // jwt.sign({ username: email, password: password_db }, 'secretkey', {expiresIn: '30s'} /* expire */, function(err, token) {
                const token = jwt.sign({ email: email, password: password_db }, process.env.JWT_PRIVATE_KEY, {expiresIn: '24h'} /* expire */, function(err, token) {
                    res.json({ 
                        staus: 200,  
                        message: 'Login succes',
                        data: {
                            email,
                            token,
                            id_user,
                            role
                            
                        }
                         })
                });
            } else {
                res.json({ message:'password is not correct' });
            }

        })
        .catch(err => {
            res.status(404).json({status: 404, message: 'please insert the correct password or username'});
        })
    },


    registerUser: function(req, res){
        let { email, password, role } = req.body;
        let body = { email, password, role }

        model.registerUser(body)
        .then(  response => { form.success(res, body); }   )
        .catch( err => console.log(err)  )  ;
    },


    



}

