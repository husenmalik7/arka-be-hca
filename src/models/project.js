const db = require("../config/db");

module.exports = {
  getEngineerProject: (engineer_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM project WHERE engineer_id = ${engineer_id}`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  },

  finishTheProject: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE project SET status = 'completed' WHERE id = ${id}`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  },

  addProject: (engineer_id, project_name) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO project (engineer_id, project_name, status) VALUES (${parseInt(
          engineer_id
        )}, '${project_name}', 'pending')`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  },

  deleteProject: (engineer_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM project WHERE engineer_id = ${parseInt(engineer_id)}`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  },

  deleteEngineerList: (company_id, engineer_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM service WHERE company_id = ${parseInt(
          company_id
        )} AND engineer_id = ${parseInt(engineer_id)}`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  },

  updateEngineerStatus: (engineer_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE engineer SET status = 'open' WHERE id = ${parseInt(
          engineer_id
        )}`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  },
};
