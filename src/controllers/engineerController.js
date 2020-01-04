const form = require('../Helper/form');
const model = require('../Models/engineerModel');


module.exports = {


    getAllEngineer: (req, res) => {
        const {query} = req;

        var page2= query.offset/5 +1;
        page2 = Math.floor(page2);

        model.getAllEngineer(query)
        .then(response => { res.json ({ status: 200, msg: 'success', appears: response.length, page: query.page || page2, response }) })
        .catch(err=> { console.log(err) });
    },



    getEngineerById: (req, res) => {
        let params = req.params.id_engineer;

        model.getEngineerById(params)
        .then(response => { res.json({  status:200, response  }); res.status(200)   })
        .catch(err => {   console.log(400); res.status(400).json({ status:400, message: 'error'  })   })

    },


    deleteEngineer: function(req, res) {
        let params = req.params.id_engineer;

        model.deleteEngineer(params)
        .then(response=> { res.json({ status:200, message: 'success delete engineer' }) })
        .catch(err=> { console.log(400); res.status(400).json({ status:400, message: 'error'}) })

    },


    postEngineer: function(req, res) {
        let { id_company, id_user, name, description, skill, location, dateofbirth, showcase, datecreated, dateupdated } = req.body;
        const body = { id_company, id_user, name, description, skill, location, dateofbirth, showcase, datecreated, dateupdated }

        model.postEngineer(body)
        .then(response => { 
            res.json({ 
                status: 200, 
                message: 'success post engineer',
                body
            })
        })
        .catch(err => { console.log(400); res.status(400).json({ status: 400, message: 'error' })
        })
    },

    putEngineer: function(req, res) {
        let params = req.params.id_engineer;
        let { id_company, id_user, name, description, skill, location, dateofbirth, showcase, datecreated, dateupdated } = req.body;
        const body = { id_company, id_user, name, description, skill, location, dateofbirth, showcase, datecreated, dateupdated };

        model.putEngineer(body, params)
        .then(response=> { res.json({ status:200, message: 'success edit engineer', body }) })
        .catch(err=> { console.log(400); res.status(400).json({ status:400, message: 'error'}) })
    }, 



}

