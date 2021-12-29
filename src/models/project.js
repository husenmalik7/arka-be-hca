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
};
