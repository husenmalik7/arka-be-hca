const db = require('../configs/db');

module.exports = {

    getAllCompany: () => {
        return new Promise ((resolve, reject) => {
            db.query('select * from company', function(err, result) {  
                if (!err) {
                    resolve (result);
                } else {
                    reject (err);
                }
            }); 
        });
    },


    getCompanyById: function(params){
        return new Promise (function(resolve, reject) {
            db.query('select * from company where id_company = ?', [params], function(err, response) {
                if (!err) {
                    resolve (result);
                } else {
                    reject (err);
                }
            })
        });

    },



    loginCompany: function(p_username){ //p_username is username that has been parse / 'oper'
        return new Promise(function(resolve, reject){
            db.query('select * from company where username = ?', [p_username], function(err, result) {
                if (!err) {
                    resolve (result);
                } else {
                    reject (err);
                }
            });
        });
    },

   


    //this things need raw json unlike the x-www.urlencoded
    postCompany: function(body) {
        return new Promise (function(resolve, reject) {
            db.query('insert into company set id_user=?, name=?, logo=?, location=?, description=?', 
                    [body.id_user, body.name, body.logo, body.location, body.description], function(err, response){
                        if (!err) {
                            resolve(response);
                        } else {
                            reject(err);
                        }
            });
        });
    },


    

    //this thing need params and x-www.urlencoded
    putCompany: function(body, params) {
        return new Promise (function(resolve, reject) {
            db.query('update company set ? where id_company = ?', [body, params], function(err, response){
                        if (!err) {
                            resolve(response);
                        } else {
                            reject(err);
                        }
            });
        });
    },

    deleteCompany: function(params) {
        return new Promise (function(resolve, reject) {
            db.query('delete from company where id_company = ?', [params], function(err, response) { 
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            });
        });
    }


};





//$$$
//Promise, resolve, reject, new
//$$$

