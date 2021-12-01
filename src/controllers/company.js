const model = require("../models/company");
const bcrypt = require("bcryptjs");

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
    let email = req.body.email;

    let body = { name, description, email, password: req.body.password };

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

  registerCompany: async (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let email = req.body.email;
    let hashPassword = bcrypt.hashSync(req.body.password);

    let body = { name, description, email, password: hashPassword };
    console.log(body);

    let isEmailSame = await model
      .findCompanyByEmail(body.email)
      .then((response) => {
        if (response.rows.length === 0) {
          return false;
        } else {
          return true;
        }
      })
      .catch((err) => {
        console.log(err);
        return true;
      });

    if (isEmailSame)
      return res.json({
        status: 200,
        msg: "email is already used",
      });

    model
      .registerCompany(body)
      .then((response) => {
        res.json({
          status: 200,
          msg: "sucess register company",
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
