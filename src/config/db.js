//queries.js = db.js

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "yyuxogekzdymfz",
  host: "ec2-3-226-59-11.compute-1.amazonaws.com",
  database: "d7jhvhv1lhhi7q",
  password: "fae34528deb3add322becd64fe769fb79f77b2984a1c1b0e31bb188ca50eede3",
  port: 5432,
  // ssl: true,

  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((error) => {
  if (error) throw error;
});

module.exports = pool;
