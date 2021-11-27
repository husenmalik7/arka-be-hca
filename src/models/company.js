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

  findCompanyByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM company WHERE EMAIL ILIKE '${email}'`,
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
        "INSERT INTO company (name, description, email, password) VALUES ($1, $2, $3, $4)",
        [body.name, body.description, body.email, body.password],
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

  registerCompany: (body) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO company (name, description, email, password) VALUES ($1, $2, $3, $4)",
        [body.name, body.description, body.email, body.password],
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

  putCompany: (body, params) => {
    return new Promise((resolve, reject) => {
      console.log(body);

      //date updated update too

      db.query(
        // `UPDATE company SET name = ${body.name}, description = ${body.description} WHERE id = ${params}`,
        "UPDATE company SET name = $1, description = $2 WHERE id = $3",
        // "UPDATE company SET ? WHERE id = ?",
        [body.name, body.description, params],
        // [body, params],
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
