const express = require("express");
const mongoose = require("mongoose");
const ar = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/auth.middleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.MONGODB_URI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(ar);
app.get("/set-cookies", (req, res) => {
  res.cookie("newUser", false, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
    httpOnly: true,
  });
  res.send("Cookies Set");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json(cookies);
});

app.get("/read-cookies", (req, res) => {});
