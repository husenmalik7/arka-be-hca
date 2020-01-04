module.exports = {
    success: (res, data) => { 
        res.json ({ status: 200, msg: 'success', appears: data.length, data }); 
    }

    //this is a good one
    //res.status(500).json({status: 404, message: 'error not found'}); 
};