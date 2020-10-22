// Required Imports
const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const bodyParser = require("body-parser");
const flash = require("flash");
var session = require("express-session");

// Setting up Express Js
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(__dirname + "/static"));
app.use(bodyParser.json({ limit: "50mb", keepExtensions: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "woot",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

// Routes
app.get("/", (req, res) => {
  res.status(200).render("index.ejs", { flash: req.flash("Welcome to Imaex") });
});

app.post("/", (req, res) => {
  console.log(req.body.image);
  const image = req.body.image;
  const ext = path.extname(image || "").split(".");
  const extension = ext[ext.length - 1];
  console.log(extension);
  let allowedExtension = ["png", "jpg", "jpeg"];

  if (allowedExtension.indexOf(extension) !== -1) {
    console.log("value exists");
  } else {
    console.log("value not exist");
  }
});

app.get("/about", (req, res) => {
  res.status(200).render("about.ejs");
});
app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
