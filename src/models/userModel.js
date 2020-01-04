const db = require('../configs/db');

module.exports = {

    loginUser: function(p_email){ //p_username is username that has been parse / 'oper'
            return new Promise(function(resolve, reject){
                db.query('select * from user where email = ?', [p_email], function(err, result) {
                    if (!err) {
                        resolve (result);
                    } else {
                        reject (err);
                    }
                });
            });
        },

    registerUser: function(body){
        return new Promise (  function(resolve, reject)   {
            db.query('insert into user set email=?, password=?, role=?', 
            [body.email, body.password, body.role], 
                function (err, response) {
                    if (!err) {
                        resolve(resolve);
                    } else {
                        reject(err);
                    }
                }
            )
        });
    }

    

}