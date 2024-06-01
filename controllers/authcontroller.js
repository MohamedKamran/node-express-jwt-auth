const User = require("../models/user.model");

// controller actions
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user1 = await User.create({ email, password });
    res.status(201).json(user1);
  } catch (error) {
    res.status(400).send("error");
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  res.send("user login");
};
