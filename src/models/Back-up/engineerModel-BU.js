const db = require("../configs/db");

module.exports = {
  getAllEngineer: (query) => {
    const name = query.name;
    const skill = query.skill;

    const sort = query.sort; //sort by name or skill
    const order = query.order; //order asc or desc

    const limit = query.limit;
    const offset = query.offset;

    const page = query.page;
    const limit2 = 5 * (page - 1);

    var q_NameOrSkill = "";
    var q_Sort = "";
    var q_Limit = "";

    if (typeof skill != "undefined" && typeof name != "undefined") {
      q_NameOrSkill = `where name like '%${name}%' and skill like '%${skill}%'`;
    } else {
      if (typeof name != "undefined") {
        q_NameOrSkill = `where name like '%${name}%'`;
      }

      if (typeof skill != "undefined") {
        q_NameOrSkill = `where skill like '%${skill}%'`;
      }
    }

    if (typeof sort != "undefined" && typeof order != "undefined") {
      q_Sort = `order by ${sort} ${order}`; //order = asc/desc //sort = by name, skill, etc
    } else {
      if (typeof sort != "undefined") {
        q_Sort = `order by ${sort}`;
      } else {
        if (typeof order != "undefined") {
          q_Sort = `order by name ${order}`;
        }
      }
    }

    if (typeof limit != "undefined" && typeof offset != "undefined") {
      q_Limit = `limit ${limit} offset ${offset}`;
    } else {
      // q_Limit = `limit 5 offset 0`

      if (typeof page != "undefined") {
        q_Limit = `limit 10 offset ${limit2}`;
      } else {
        // q_Limit = `limit 10 offset 0`;
        q_Limit = ``;
      }
    }

    return new Promise((resolve, reject) => {
      db.query(
        `select * from engineer ${q_NameOrSkill} ${q_Sort} ${q_Limit}`,

        function (err, response) {
          if (!err) {
            resolve(response);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  getByName: function (query) {
    return new Promise(function (resolve, reject) {
      db.query(
        `select * from engineer where name like '%${query.name}%'`,
        function (err, response) {
          if (!err) {
            resolve(response);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  getByNameAndSkill: function (query) {
    return new Promise(function (resolve, reject) {
      db.query(
        `select * from engineer where name like '%${query.name}%' and skill like '%${query.skill}%'`,
        function (err, response) {
          if (!err) {
            resolve(response);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  sortByName: function () {
    return new Promise(function (resolve, reject) {
      db.query(
        "select * from engineer order by name",
        function (err, response) {
          if (!err) {
            resolve(response);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  sortBySkill: function () {
    return new Promise(function (resolve, reject) {
      db.query(
        "select * from engineer order by skill",
        function (err, response) {
          if (!err) {
            resolve(response);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  sortByDateUpdated: function () {
    return new Promise(function (resolve, reject) {
      db.query(
        "select dateupdated from engineer order by dateupdated",
        function (err, response) {
          if (!err) {
            resolve(response);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  getLimit: function (query) {
    return new Promise(function (resolve, reject) {
      db.query(
        `select * from engineer limit ${query.limit} offset ${query.offset}`,
        function (err, response) {
          if (!err) {
            resolve(response);
          } else {
            reject(response);
          }
        }
      );
    });
  },

  postEngineer: function (body) {
    return new Promise(function (resolve, reject) {
      db.query("insert into engineer set ?", [body], function (err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },

  putEngineer: function (body, params) {
    return new Promise(function (resolve, reject) {
      db.query(
        "update engineer set ? where id_engineer = ?",
        [body, params],
        function (err, result) {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  deleteEngineer: function (params) {
    return new Promise(function (resolve, reject) {
      db.query(
        "delete from engineer where id_engineer = ?",
        [params],
        function (err, result) {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  getEngineerById: function (params) {
    return new Promise(function (resolve, reject) {
      db.query(
        "select * from engineer where id_engineer = ?",
        [params],
        function (err, result) {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  },
};
