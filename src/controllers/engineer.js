const model = require("../models/engineer");

module.exports = {
  registerEngineer: async (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let email = req.body.email;
    let location = req.body.location;

    let body = {
      name,
      description,
      email,
      password: req.body.password,
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
};
