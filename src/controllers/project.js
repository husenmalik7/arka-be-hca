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

  dismissEngineer: async (req, res) => {
    let { engineer_id, company_id } = req.body;

    let _deleteProject = await model
      .deleteProject(engineer_id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    let _deleteEngineerList = await model
      .deleteEngineerList(company_id, engineer_id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    let _updateEngineerStatus = await model
      .updateEngineerStatus(engineer_id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    res.send({
      status: 200,
      msg: `success dismiss engineer`,
    });

    //delete project
    // engineer id = 87

    //dlete engineer list / service
    // engineer id and compnay id

    //set status engineer open
    // update engineer id set status  to open
  },

  getProjectList: (req, res) => {
    let engineer_id = req.body.engineer_id;

    model
      .getProjectList(engineer_id)
      .then((response) => {
        console.log(response);

        res.send({
          status: 200,
          msg: `success get project list`,
          data: response.rows,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
