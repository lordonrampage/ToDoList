const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

let items = [];
let workItems = [];
let day = "";

app.get("/", function (req, res) {
  let day = date.getDate();
  res.render("list", { ListTitle: day, items: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { ListTitle: "Work list", items: workItems });
});

app.post("/work", function (req, res) {
  let workItem = req.body.newItem;
  workItems.push(workItem);
  res.redirect("/work");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server has started at port 3000");
});
