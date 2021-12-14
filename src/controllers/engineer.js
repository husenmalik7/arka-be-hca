const model = require("../models/engineer");
const bcrypt = require("bcryptjs");

module.exports = {
  registerEngineer: async (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let email = req.body.email;
    let location = req.body.location;
    let hashPassword = bcrypt.hashSync(req.body.password);

    let body = {
      name,
      description,
      email,
      password: hashPassword,
      location,
    };

    let isEmailSame = await model
      .findEngineerByEmail(body.email)
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
      .registerEngineer(body)
      .then((response) => {
        res.json({
          status: 200,
          msg: "sucess register engineer",
          // data: response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getEngineerById: async (req, res) => {
    let params = req.params.id;

    let getEngineerResult = await model
      .getEngineerById(params)
      .then((response) => {
        console.log("success get engineer by id");
        return response.rows[0];
      })
      .catch((error) => {
        console.log(error);
        return error;
      });

    let getSkillsResult = await model
      .getSkillsEngineerById(params)
      .then((response) => {
        console.log("success get skill");
        console.log(response.rows);
        return response.rows;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });

    let finalResult = { ...getEngineerResult };
    finalResult = {
      ...getEngineerResult,
      skills: [...getSkillsResult],
    };

    res.json({
      status: 200,
      msg: "success",
      data: finalResult,
    });
  },

  getAllEngineer: (req, res) => {
    model
      .getAllEngineer()
      .then(async (response) => {
        let resultsPerPage = 4;
        let totalOfResults = response.rows.length;
        let numOfPages = Math.ceil(totalOfResults / resultsPerPage);

        let page = req.query.page ? Number(req.query.page) : 1;

        if (page > numOfPages) {
          return res.redirect(
            "/engineer?page=" + encodeURIComponent(numOfPages)
          );
        } else if (page < 1) {
          return res.redirect("/engineer?page=" + encodeURIComponent("1"));
        }

        let startLimit = (page - 1) * resultsPerPage;

        let arrLimit = await model
          .getLimitEngineer(startLimit, resultsPerPage)
          .then((response) => {
            return response.rows;
          })
          .catch((error) => {
            console.log(error);
          });

        res.json({
          status: 200,
          msg: "success",

          page,
          numOfPages,
          data: arrLimit,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
