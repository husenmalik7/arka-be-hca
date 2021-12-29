const model = require("../models/project");

module.exports = {
  finishTheProject: (req, res) => {
    let id = req.body.id;

    model
      .finishTheProject(id)
      .then((response) => {
        console.log(response);
        res.send({
          status: 200,
          msg: `success finish the project id = ${id}`,
        });
      })
      .catch((error) => console.log(error));
  },
};
