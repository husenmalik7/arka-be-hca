const jwt = require("jsonwebtoken");
const secretkey = require("../helpers/secretkey");

module.exports = {
  authentication: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // console.log({ token });
    // console.log({ secretkey });

    if (token === null || token === undefined) {
      console.log("token is null");
      return res.sendStatus(401);
    }

    jwt.verify(token, secretkey, (err, user) => {
      if (err) {
        console.log(err);
        let msg = "token is expired or false";
        console.log(msg);

        return res.json({
          status: 403,
          msg,
        });

        // return res.sendStatus(403);
      }
      console.log(user);
      req.user = user;
      next();
    });
  },
};
