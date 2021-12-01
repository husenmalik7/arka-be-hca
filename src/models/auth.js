const db = require("../config/db");

module.exports = {
  findDataByEmail: (role, email) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM ${role} WHERE EMAIL ILIKE '${email}'`,
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
