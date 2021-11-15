const model = require("../models/company");

module.exports = {
  testGet: (_, res) => {
    res.json({
      status: 200,
      msg: "hood gone love it",
    });
  },

  getAllCompany: (_, res) => {
    model
      .getAllCompany()
      .then((response) => {
        res.json({
          status: 200,
          msg: "sucess",
          data: response.rows,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getCompanyById: (req, res) => {
    let params = req.params.id;

    model
      .getCompanyById(params)
      .then((response) => {
        res.json({
          status: 200,
          msg: "sucess",
          data: response.rows,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  postCompany: (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let body = { name, description };

    model
      .postCompany(body)
      .then((response) => {
        res.json({
          status: 200,
          msg: "sucess post company",
          // data: response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  putCompany: (req, res) => {
    let params = req.params.id;

    let { name, description } = req.body;
    let body = {
      name,
      description,
    };

    model
      .putCompany(body, params)
      .then((response) => {
        res.json({
          status: 200,
          msg: "sucess put company",
          // data: response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
