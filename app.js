const express = require("express");
const session = require("express-session"); //session setup
//creating app
const app = express();
//send an HTTP response when receiving HTTP GET /
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});
//route for contacts
app.get("/contacts", (req, res) => {
  res.render("contacts");
});
// using JSON and URL Encoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session setup (secret key)
app.use(
  session({
    secret: "mis.123",
    resave: true,
    saveUninitialized: true
  })
);
//login route
app.get("/login", (req, res) => {
  res.render("login");
});
//register route
app.get("/register", (req, res) => {
  res.render("register");
});
//pass requests to the router middleware
const router = require("./routes/apis");
app.use(router);

//make the app listen on port
const port = process.argv[2] || process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Cart app listening at http://localhost:${port}`);
});
