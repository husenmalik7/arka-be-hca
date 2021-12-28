const model = require("../models/company");
const modelEngineer = require("../models/engineer");
const modelProject = require("../models/project");
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
          msg: "success",
          data: response.rows,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getEngineerList: (req, res) => {
    let company_id = req.body.company_id;

    console.log({ company_id });

    model
      .getEngineerList(company_id)
      .then((response) => {
        res.json({
          status: 200,
          msg: "success get engineer list",
          data: response.rows,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getEngineerProject: async (req, res) => {
    let engineer_id = req.body.engineer_id;

    let dataEngineer = await modelEngineer
      .getEngineerById(engineer_id)
      .then((response) => {
        return response.rows[0];
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(dataEngineer);

    let projectEngineer = await modelProject
      .getEngineerProject(engineer_id)
      .then((response) => {
        return response.rows;
      })
      .catch((error) => {
        console.log(error);
      });

    res.json({
      status: 200,
      msg: "success get project list",
      data: dataEngineer,
      dataProject: projectEngineer,
    });
  },

  getCompanyById: (req, res) => {
    let params = req.params.id;

    model
      .getCompanyById(params)
      .then((response) => {
        res.json({
          status: 200,
          msg: "success",
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
