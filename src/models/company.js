const db = require("../config/db");

module.exports = {
  getAllCompany: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM company", (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  getCompanyById: (params) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM company WHERE id = $1",
        [params],
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

  postCompany: (body) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO company (name, description) VALUES ($1, $2)",
        [body.name, body.description],
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
