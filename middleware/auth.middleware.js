const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      "some long secret which bad guis will copy",
      (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect("/login");
        } else {
          console.log(decodedToken);
          next();
        }
      }
    );
  } else {
    res.redirect("/login");
  }
};

// get current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      "some long secret which bad guis will copy",
      (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          next();
        } else {
          console.log(decodedToken);
          let user = User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      }
    );
  }
};

module.exports = { requireAuth, checkUser };
