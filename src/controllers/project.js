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

  addProject: (req, res) => {
    let { engineer_id, project_name } = req.body;

    model
      .addProject(engineer_id, project_name)
      .then((response) => {
        console.log(response);

        res.send({
          status: 200,
          msg: `success add project`,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
