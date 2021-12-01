const model = require("../models/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_PRIVATE_KEY = "secretkey";

module.exports = {
  login: async (req, res) => {
    let body = {
      role: req.body.role,
      email: req.body.email,
      password: req.body.password,
    };

    await model
      .findDataByEmail(body.role, body.email)
      .then((response) => {
        if (!response.rows.length > 0) {
          return emailIsNotFound();
        }

        let checkPassword = doCheckPassword(
          (databasePassword = response.rows[0].password),
          (bodyPassword = body.password)
        );

        if (!checkPassword) {
          return passwordIsFalse();
        }

        const token = jwt.sign(
          {
            id: response.rows[0].id,
          },
          JWT_PRIVATE_KEY,
          { expiresIn: "1h" }
        );

        console.log("login success");

        res.json({
          status: 200,
          msg: "login success",
          data: {
            id: response.rows[0].id,
            email: response.rows[0].email,
            token,
          },
        });
      })
      .catch((err) => {
        console.log(`something is wrong [login]`);
        res.json({
          msg: `something is wrong [login]`,
        });
      });

    function doCheckPassword(databasePassword, bodyPassword) {
      return bcrypt.compareSync(bodyPassword, databasePassword);
    }

    function emailIsNotFound() {
      let string = "your email is not found";
      console.log(string);
      res.json({
        msg: string,
      });
    }

    function passwordIsFalse() {
      let string = "your password is false";
      console.log(string);
      res.json({
        msg: string,
      });
    }
  },
};
