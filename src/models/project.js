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
};
