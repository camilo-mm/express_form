const express = require("express");
const app = express();
const url = require("url");

var path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

var cookieParser = require("cookie-parser");
app.use(cookieParser());
//app.set("views", "./views");
// index page

app.get("/", function(req, res) {
  var name_cookie = req.cookies["name"];
  var surname_cookie = req.cookies["surname"];
  console.log("req.cookies", req.cookies);

  const {valid_name, valid_surname, valid_password} = req.query;
  console.log("req.query", req.query);

  if (req.query) {
    res.render("pages/index", {valid_name, valid_surname, valid_password, name_cookie, surname_cookie}); //{val_name: valid_name === "1" ? 1 : 0, val_surname: valid_surname === "1" ? 1 : 0, val_password: valid_password === "1" ? 1 : 0});
  } else {
    res.render("pages/index");
  }
});

app.post("/submit", (req, res) => {
  console.log("Submit data:", req.body);
  const {
    body: {name, surname, password, agreepolicy}
  } = req;

  resQuery = {
    valid_name: name === "" ? "0" : "1",
    valid_surname: surname === "" ? "0" : "1",
    valid_password: password === "" ? "0" : "1"
  };
  res.cookie("name", name, {maxAge: 900000, httpOnly: true});
  res.cookie("surname", surname, {maxAge: 900000, httpOnly: true});

  res.redirect(
    303,
    url.format({
      pathname: "/",
      query: resQuery
    })
  );
});

app.listen(9000, () => console.log("Listening on port 9000!"));
