const model = require('../Models/companyModel');
const form = require('../Helper/form');
const jwt = require('jsonwebtoken'); //i cant use it on main(index.js), but in here it will works



module.exports = {
    getAllCompany: (_, res) => {
        model.getAllCompany().then(response => {
            // res.json ({ status: 200, msg: 'success', appears: response.length, response })

            form.success (res, response); //resolve
        }).catch(err=>{
            console.log(err); //reject
        });
    }, 


    postCompany: function(req, res) {
        let { id_user, name, logo, location, description} =  req.body;
        let body = {
            id_user, name, logo, location, description
        }

        if (typeof body.id_user === "undefined" || typeof body.name === "undefined" || typeof body.logo === "undefined" || typeof body.location === "undefined" ||
            typeof body.description === "undefined"  ) {
            res.json({message: 'please input all fields'});
        } else {

            if (body.id_user == '' || body.name == '' || body.logo == '' || body.location == '' ||
                body.description == ''  ){
                res.json({message: 'please input the value in  all fields'});
            } else {

                model.postCompany(body)
                .then(response => { form.success(res, body); })
                .catch(err => console.log(err));

            }
        }  
    },

    putCompany: function(req, res) {
        let params = req.params.id_company;
        let { id_user, name, logo, location, description } =  req.body;
        let body = {
            id_user, name, logo, location, description
        }
        

        if (typeof body.id_user === "undefined" || typeof body.name === "undefined" || typeof body.logo === "undefined" || typeof body.location === "undefined" ||
            typeof body.description === "undefined" ) {
            res.json({message: 'please input all fields'});

        } else {

            if (body.id_user == '' || body.name == '' || body.logo == '' || body.location == '' ||
                body.description == '' ){
                res.json({message: 'please input the value in  all fields'});
            } else {

                model.putCompany(body, params)
                .then(response => { 
                    res.json({
                        status: 200,
                        message: 'success put company',
                        body
                    })
                })
                .catch(err => { console.log(err); res.status(400).json({ status: 400, message: 'error' })
                })

            }
        }
                
    },



    loginCompany:  function(req, res){
        const username_input = req.body.username;
        const password_input = req.body.password;

        console.log(username_input);
        console.log(password_input);

        model.loginCompany(username_input)
        .then(responseQuery => {
            const password_db = responseQuery[0].password; //use array index 0 or anything, cause this response type is array
            
            const compareresult = password_input.localeCompare(password_db); //comparing password_input and password in database 
            if ( compareresult == 0) { //zero mean has same value
                
                jwt.sign({ username: username_input, password: password_db }, process.env.JWT_PRIVATE_KEY, {expiresIn: '30s'} /* expire */, function(err, token) {
                // jwt.sign({ username: username_input, password: password_db }, 'secretkey', {expiresIn: '30s'} /* expire */, function(err, token) {
                    res.json({ token })
                });
            } else {
                res.json({ message:'password is not correct' });
            }

        })
        .catch(err => {
            res.status(404).json({status: 404, message: 'please insert the correct password or username'});
        })

 
        // const body = {username, password};
        // console.log(body);

        // jwt.sign({ body }, 'secretkey', {expiresIn: '30s'} /* expire */, (err, token) => {
        //     res.json({
        //         token
        //     });
        // });
    },

    logincheck: function(req, res) {
        //verifyToken; //i want to call function but it doesnt work
        
        //<verifytoken>
        const bearerHeader = req.headers['authorization'];   

        //check if bearer is undefined
        if(typeof bearerHeader !== 'undefined'){
            //split at the space
            const bearer = bearerHeader.split(' '); //separate bearer (space) access_token

            //get token from array
            const bearerToken = bearer[1];

            //set the token
            req.token = bearerToken;

            //next middleware
            // console.log('lkjlkjlkjlkjlk');
            // next();
        //</verifytoken>

            jwt.verify(req.token, process.env.JWT_PRIVATE_KEY, function(err, authData){
            // jwt.verify(req.token, 'secretkey', function(err, authData){
                if(err){
                    // res.sendStatus(403); 
                    res.status(403).json({status: 403, message: 'your token has expired or destroyed'});
                } else {
                    res.json({
                        message: 'Post created',
                        authData
                    })
                }

            });
        }else{
            //Forbidden
            res.sendStatus(403); console.log('awiawiawawi');
        }   

    },


    deleteCompany: function(req, res) {
        let params = req.params.id_company;

        model.deleteCompany(params)
            .then(response => {
                res.json({
                    status: 200,
                    message: 'success delete company',
                })
            })
            .catch(err => { console.log(err); res.status(400).json({ status: 400, message: 'error' })
            })
    },


    getCompanyById: (req, res) => {
        let params = req.params.id_company

        model.getCompanyById().then(response => {
            form.success (res, response); //resolve
        }).catch(err=>{
            console.log(err); //reject
        });
    }, 

}

//FORMAT OF TOKEN
//authorization: bearer <access token>


//verify token
// function verifyToken(req, res, next){
//     //get auth header value
//     const bearerHeader = req.headers['authorization'];   

//     //check if bearer is undefined
//     if(typeof bearerHeader !== 'undefined'){
//         //split at the space
//         const bearer = bearerHeader.split(' '); //separate bearer (space) access_token

//         //get token from array
//         const bearerToken = bearer[1];

//         //set the token
//         req.token = bearerToken;

//         //next middleware
//         console.log('lkjlkjlkjlkjlk');
//         next();
//     }else{
//         //Forbidden
//         res.sendStatus(403); console.log('awiawiawawi');
//     }
// }



